create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  firebase_uid text unique,
  email text unique not null,
  display_name text,
  avatar_url text,
  role text not null default 'customer',
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  parent_slug text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id),
  name text not null,
  slug text unique not null,
  description text,
  price numeric(12,2) not null default 0,
  compare_at_price numeric(12,2),
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  image_url text not null,
  sort_order int not null default 0,
  color text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  size text not null,
  color text not null,
  stock int not null default 0,
  sku text,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  customer_email text not null,
  customer_name text,
  customer_phone text,
  shipping_method text,
  shipping_address text,
  shipping_city text,
  shipping_postal_code text,
  notes text,
  subtotal numeric(12,2) not null default 0,
  shipping_cost numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  status text not null default 'pending',
  payment_status text not null default 'pending',
  tracking_code text,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  product_name text not null,
  size text,
  color text,
  quantity int not null,
  unit_price numeric(12,2) not null,
  total numeric(12,2) not null
);

create table if not exists settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Categorías iniciales
insert into categories (name, slug, parent_slug) values
('Conjuntos', 'conjuntos', null),
('Encaje', 'conjuntos-encaje', 'conjuntos'),
('Algodón', 'conjuntos-algodon', 'conjuntos'),
('Morley', 'conjuntos-morley', 'conjuntos'),
('Con aro', 'conjuntos-con-aro', 'conjuntos'),
('Sin aro', 'conjuntos-sin-aro', 'conjuntos'),
('Bombachas', 'bombachas', null),
('Lencería', 'lenceria', null),
('Bodys', 'bodys', 'lenceria'),
('Sets', 'sets', 'lenceria'),
('Accesorios', 'accesorios', null),
('Medias', 'medias', 'accesorios'),
('Cancanes', 'cancanes', 'accesorios'),
('Bóxer', 'boxer', 'accesorios'),
('Ofertas', 'ofertas', null)
on conflict (slug) do nothing;

insert into settings (key, value) values
('maintenance_mode', '{"enabled": false, "message": "Estamos actualizando la tienda. Volvemos pronto."}'),
('store_contact', '{"instagram":"@afrodita_lenceria","email":"afroditalcenceria.oficial2@gmail.com","city":"Córdoba, Argentina"}')
on conflict (key) do nothing;

-- RLS simple para desarrollo. Más adelante se endurece para que solo admin escriba.
alter table profiles enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table settings enable row level security;

drop policy if exists "profiles_select" on profiles;
drop policy if exists "profiles_insert" on profiles;
drop policy if exists "profiles_update" on profiles;
create policy "profiles_select" on profiles for select using (true);
create policy "profiles_insert" on profiles for insert with check (true);
create policy "profiles_update" on profiles for update using (true);

drop policy if exists "categories_select" on categories;
drop policy if exists "categories_write" on categories;
create policy "categories_select" on categories for select using (true);
create policy "categories_write" on categories for all using (true) with check (true);

drop policy if exists "products_select" on products;
drop policy if exists "products_write" on products;
create policy "products_select" on products for select using (true);
create policy "products_write" on products for all using (true) with check (true);

drop policy if exists "product_images_select" on product_images;
drop policy if exists "product_images_write" on product_images;
create policy "product_images_select" on product_images for select using (true);
create policy "product_images_write" on product_images for all using (true) with check (true);

drop policy if exists "product_variants_select" on product_variants;
drop policy if exists "product_variants_write" on product_variants;
create policy "product_variants_select" on product_variants for select using (true);
create policy "product_variants_write" on product_variants for all using (true) with check (true);

drop policy if exists "orders_select" on orders;
drop policy if exists "orders_write" on orders;
create policy "orders_select" on orders for select using (true);
create policy "orders_write" on orders for all using (true) with check (true);

drop policy if exists "order_items_select" on order_items;
drop policy if exists "order_items_write" on order_items;
create policy "order_items_select" on order_items for select using (true);
create policy "order_items_write" on order_items for all using (true) with check (true);

drop policy if exists "settings_select" on settings;
drop policy if exists "settings_write" on settings;
create policy "settings_select" on settings for select using (true);
create policy "settings_write" on settings for all using (true) with check (true);

-- Storage: crear bucket manualmente llamado products y público.
-- Policy sugerida para storage.objects:
-- bucket_id = 'products'

-- Parches para proyectos que ya tenían tablas creadas de versiones anteriores
alter table product_images add column if not exists color text;
alter table product_images add column if not exists is_primary boolean not null default false;
alter table product_images add column if not exists created_at timestamptz not null default now();
alter table orders add column if not exists shipping_method text;
alter table orders add column if not exists notes text;
