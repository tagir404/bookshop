import{d as c,u as _,c as o,F as l,r as d,a as t,o as a,b as e,f as u,e as m,t as i,_ as p}from"./index-sj5ANvA8.js";const f={class:"container"},k=["src"],h={class:"book__info"},g={class:"book__title"},v=["innerHTML"],b={class:"book__price"},B=c({__name:"BasketPage",setup(I){const r=_();return(x,L)=>(a(),o("div",f,[(a(!0),o(l,null,d(t(r).books,s=>{var n;return a(),o("article",{class:"book",key:s.id},[e("img",{class:"book__img",src:t(u)((n=s.volumeInfo.imageLinks)==null?void 0:n.small)||t(m),alt:"Обложка книги"},null,8,k),e("div",h,[e("h2",g,i(s.volumeInfo.title),1),e("div",{class:"book__description",innerHTML:s.volumeInfo.description},null,8,v),e("p",b," Цена: "+i(Math.round(s.saleInfo.retailPrice.amount))+" ₽ ",1)])])}),128))]))}}),S=p(B,[["__scopeId","data-v-3d862964"]]);export{S as default};
