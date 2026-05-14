export interface Product {
  id: number;
  name: string;
  detail: string;
  price: string;
  priceNum: number;
  image: string;
  description: string;
  specs: string[];
  sizes: string[];
  color: string;
  number: string;
}

export const allProducts: Product[] = [
  { id:1, name:'Essential Hoodie', detail:'400gsm · Black', price:'€185', priceNum:185, image:'/images/product1.jpg', description:'Oversized heavyweight hoodie in garment-dyed black. 400gsm brushed cotton fleece with ribbed cuffs and hem. Relaxed drop-shoulder fit.', specs:['400gsm Cotton Fleece','Garment-Dyed','Relaxed Oversized','Designed in Port Said'], sizes:['S','M','L','XL','XXL'], color:'Black', number:'001/200' },
  { id:2, name:'Washed Tee', detail:'Garment Dyed · Off-White', price:'€95', priceNum:95, image:'/images/product2.jpg', description:'Essential tee in enzyme-washed off-white. 280gsm heavyweight cotton with a lived-in feel from day one.', specs:['280gsm Cotton Jersey','Enzyme Washed','Relaxed Fit','Designed in Port Said'], sizes:['S','M','L','XL','XXL'], color:'Off-White', number:'001/200' },
  { id:3, name:'Cargo Pant', detail:'Relaxed · Black', price:'€210', priceNum:210, image:'/images/product3.jpg', description:'Relaxed-fit cargo in washed black cotton twill. Minimal pocket design with matte black hardware.', specs:['320gsm Cotton Twill','Matte Black Hardware','Wide Leg','Designed in Port Said'], sizes:['S','M','L','XL','XXL'], color:'Black', number:'001/200' },
  { id:4, name:'Bomber Jacket', detail:'Water Resistant · Olive', price:'€340', priceNum:340, image:'/images/product4.jpg', description:'Technical bomber in matte olive. Water-resistant outer with brushed cotton lining.', specs:['Water-Resistant Shell','Brushed Cotton Lining','Relaxed Fit','Designed in Port Said'], sizes:['S','M','L','XL'], color:'Olive', number:'001/200' },
  { id:5, name:'Heavyweight Sweatpant', detail:'400gsm · Black', price:'€165', priceNum:165, image:'/images/product1.jpg', description:'Matching sweatpant to the Essential Hoodie. Same 400gsm heavyweight fleece. Relaxed tapered leg.', specs:['400gsm Cotton Fleece','Garment-Dyed','Relaxed Taper','Designed in Port Said'], sizes:['S','M','L','XL','XXL'], color:'Black', number:'001/200' },
  { id:6, name:'Mock Neck', detail:'Ribbed · Charcoal', price:'€120', priceNum:120, image:'/images/product3.jpg', description:'Ribbed mock-neck in charcoal. Fine-gauge cotton knit with subtle texture.', specs:['240gsm Ribbed Cotton','Fine Gauge Knit','Slim Fit','Designed in Port Said'], sizes:['S','M','L','XL'], color:'Charcoal', number:'001/200' },
  { id:7, name:'Canvas Cap', detail:'Washed · Black', price:'€55', priceNum:55, image:'/images/product2.jpg', description:'Six-panel cap in washed black canvas. Unstructured crown with subtle embossed LOWKEY mark.', specs:['Washed Canvas','Unstructured','Adjustable','Designed in Port Said'], sizes:['One Size'], color:'Black', number:'001/200' },
  { id:8, name:'Essential Shorts', detail:'400gsm · Black', price:'€125', priceNum:125, image:'/images/product4.jpg', description:'Cut from the same 400gsm heavyweight fleece. Relaxed fit hitting just above the knee.', specs:['400gsm Cotton Fleece','Garment-Dyed','Above Knee','Designed in Port Said'], sizes:['S','M','L','XL','XXL'], color:'Black', number:'001/200' },
];

export const featuredProducts = allProducts.slice(0, 4);
