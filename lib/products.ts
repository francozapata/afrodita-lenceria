export type Variant={size:string;color:string;stock:number};
export type Product={id:string;name:string;category:string;price:number;oldPrice?:number;image:string;description:string;variants:Variant[];featured?:boolean;tags?:string[]};
export const products:Product[]=[
{id:'conjunto-encaje-piel',name:'Conjunto Encaje Piel',category:'Conjuntos',price:12000,oldPrice:14500,image:'/afrodita-logo.jpg',description:'Conjunto delicado de encaje color piel. Ideal para uso diario elegante. Revisar guía de talles antes de comprar.',featured:true,tags:['Oferta','Stock real'],variants:[{size:'85',color:'Piel',stock:2},{size:'95',color:'Piel',stock:5},{size:'100',color:'Piel',stock:1}]},
{id:'conjunto-algodon-soft',name:'Conjunto Algodón Soft',category:'Conjuntos',price:13500,image:'/afrodita-logo.jpg',description:'Conjunto cómodo de algodón suave, pensado para todos los días.',featured:true,tags:['Nuevo'],variants:[{size:'90',color:'Blanco',stock:4},{size:'95',color:'Negro',stock:3},{size:'100',color:'Rosa',stock:0}]},
{id:'body-clasico-negro',name:'Body Clásico Negro',category:'Lencería',price:18500,image:'/afrodita-logo.jpg',description:'Body elegante para una ocasión especial o para combinar con jean/saco.',featured:true,tags:['Más vendido'],variants:[{size:'S',color:'Negro',stock:3},{size:'M',color:'Negro',stock:4},{size:'L',color:'Negro',stock:0}]},
{id:'bombacha-microfibra',name:'Bombacha Microfibra',category:'Bombachas',price:5200,image:'/afrodita-logo.jpg',description:'Bombacha cómoda de microfibra, costuras suaves y calce diario.',variants:[{size:'S',color:'Nude',stock:8},{size:'M',color:'Negro',stock:7},{size:'L',color:'Blanco',stock:6}]},
{id:'set-sexy-rojo',name:'Set Sexy Rojo',category:'Lencería',price:16900,image:'/afrodita-logo.jpg',description:'Set especial con detalles delicados y terminación premium.',tags:['Últimas unidades'],variants:[{size:'S',color:'Rojo',stock:1},{size:'M',color:'Rojo',stock:1},{size:'L',color:'Rojo',stock:0}]},
{id:'boxer-morley',name:'Bóxer Morley',category:'Accesorios',price:8500,image:'/afrodita-logo.jpg',description:'Bóxer cómodo de morley, con buena elasticidad.',variants:[{size:'S',color:'Gris',stock:6},{size:'M',color:'Negro',stock:2},{size:'L',color:'Azul',stock:3}]}
];
export const categories=['Todos','Conjuntos','Bombachas','Lencería','Accesorios','Ofertas'];
export const colors=['Negro','Blanco','Piel','Nude','Rosa','Rojo','Gris','Azul'];
export const sizes=['85','90','95','100','S','M','L','XL'];
