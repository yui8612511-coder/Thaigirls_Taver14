const NAMES = [ ['Pam','images/Pam.jpg'], ['Arhoung','images/Arhoung.jpg'], ['May','images/May.jpg'], ['Yuyu','images/Yuyu.jpg'], ['Apple','images/Apple.jpg'], ['Nycha','images/Nycha.jpg'], ['Myyu','images/Myyu.jpg'], ['Piploy','images/Piploy.jpg'], ['Enjoy','images/Enjoy.jpg'], ['Bonnie','images/Bonnie.jpg'], ['Lilly','images/Lilly.jpg'], ['Faye','images/Faye.jpg'], ['Tan', 'images/Tan.jpg'], ['Engfa', 'images/Engfa.jpg'], ['Jayna', 'images/Jayna.jpg'], ['Aya', 'images/Aya.jpg'], ['Fond', 'images/Fond.jpg'], ['Ciize', 'images/Ciize.jpg'], ['Jaoying', 'images/Jaoying.jpg'], ['Oaey', 'images/Oaey.jpg'], ['Namtan', 'images/Namtan.jpg'], ['Tungpang', 'images/Tungpang.jpg'], ['Mint', 'images/Mint.jpg'], ['Mim', 'images/Mim-2.jpg'], ['Mingming', 'images/Mingming.jpg'], ['Gift', 'images/Gift.jpg'], ['Aosin', 'images/Aosin.jpg'], ['Puyfai', 'images/Puyfai.jpg'], ['Orm', 'images/Orm.jpg'], ['Opal', 'images/Opal.jpg'], ['Earn', 'images/Earn.jpg'], ['June', 'images/June-2.jpg'], ['Janeyeh', 'images/Janeyeh.jpg'], ['June', 'images/June.jpg'], ['Fay', 'images/Fay.jpg'], ['Tk', 'images/Tk.jpg'], ['Film', 'images/Film.jpg'], ['Anda', 'images/Anda.jpg'], ['Nur', 'images/Nur.jpg'], ['Grace', 'images/Grace.jpg'], ['Belle', 'images/Belle.jpg'], ['Namwan', 'images/Namwan.jpg'], ['Niky', 'images/Niky.jpg'], ['Mewnich', 'images/Mewnich.jpg'], ['Jingjing', 'images/Jingjing.jpg'], ['Natt', 'images/Natt.jpg'], ['Pahn', 'images/Pahn.jpg'], ['Becky', 'images/Becky.jpg'], ['Mie', 'images/Mie.jpg'], ['Kapook', 'images/Kapook.jpg'], ['Shu', 'images/Shu.jpg'], ['Lookhmee', 'images/Lookhmee.jpg'], ['Yada', 'images/Yada.jpg'], ['Whan', 'images/Whan.jpg'], ['Noey', 'images/Noey.jpg'], ['Fay', 'images/Fay-2.jpg'], ['Lookkaew', 'images/Lookkaew.jpg'], ['Charlotte', 'images/Charlotte.jpg'], ['Meen', 'images/Meen.jpg'], ['Oom', 'images/Oom.jpg'], ['Gene', 'images/Gene.jpg'], ['Lena', 'images/Lena.jpg'], ['Milk', 'images/Milk.jpg'], ['Pangjie', 'images/Pangjie.jpg'], ['Atom', 'images/Atom.jpg'], ['Sonya', 'images/Sonya.jpg'], ['Nile', 'images/Nile.jpg'], ['Lingling', 'images/Lingling.jpg'], ['Ginny', 'images/Ginny.jpg'], ['Miu', 'images/Miu.jpg'], ['Bam', 'images/Bam.jpg'], ['Mook', 'images/Mook.jpg'], ['Kao', 'images/Kao.jpg'], ['Freen', 'images/Freen.jpg'], ['Jessie', 'images/Jessie.jpg'], ['England', 'images/England.jpg'], ['Love', 'images/Love.jpg'], ['Namneung', 'images/Namneung.jpg'], ['Chanya', 'images/Chanya.jpg'], ['Pitcha', 'images/Pitcha.jpg'], ['View', 'images/View.jpg'], ['Emi', 'images/Emi.jpg'], ['Puinnoon', 'images/Puinnoon.jpg'], ['Mable', 'images/Mable.jpg'], ['Mim', 'images/Mim.jpg'], ['Babe', 'images/Babe.jpg'], ['Bint', 'images/Bint.jpg'], ['Jan', 'images/Jan.jpg'], ['Yoko', 'images/Yoko.jpg'], ['Prim', 'images/Prim.jpg'], ['Nepjune', 'images/Nepjune.jpg'], ['Ploy', 'imag
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    es/Ploy.jpg']];

const A = NAMES.map((x, i) => ({ id: i, name: x[0], group: "", image: x[1] }));

let S={pre:[],candidates:[],score:{},round:1,pairs:[],pi:0,first:null,finalists:[],lastPairs:[],li:0,ranking:[],pool:[]};
const $=s=>document.querySelector(s), screens=["home","preIntro","pre","preDone","mainIntro","main","mainDone","lastIntro","last","finalists","final","result"];
function show(id){screens.forEach(x=>$("#"+x).classList.toggle("hidden",x!==id));scrollTo(0,0)}
function toast(t){$("#toast").textContent=t;$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),1400)}
function c(i){return["#a87388","#c18c8e","#817395","#c18d76","#8d7c93","#b17c87","#7c8196","#bd9480","#967080","#7c7188"][i%10]}
function init(a,badge=""){return `<div class="photo" style="background:${c(a.id)}"><img src="${a.image}" onerror="this.style.display='none'">${badge?`<span class="badge">${badge}</span>`:""}</div>`}
function get(id){return A.find(a=>a.id===id)}
function card(id,cls="card"){let a=get(id);return `<button class="${cls}" data-id="${id}">${init(a)}<div class="name">${a.name}</div></button>`}
function resetAll(){S={pre:[],candidates:[],score:{},round:1,pairs:[],pi:0,first:null,finalists:[],lastPairs:[],li:0,ranking:[],pool:[]};show("home")}

let groups=[],gi=0,picked=[];
function makeGroups(){
  groups=[];
  let i=0;
  while(i<A.length){
    const left=A.length-i;
    // Keep every preliminary screen at 3 or 4 candidates.
    // For 92 candidates this becomes 23 groups of 4.
    const n = left===6 || left%4===3 ? 3 : 4;
    groups.push(A.slice(i,i+n));
    i+=n;
  }
}
function startPre(){makeGroups();gi=0;S.pre=[];renderPre();show("pre")}
function renderPre(){let g=groups[gi];$("#preTitle").textContent=`預選 ${gi+1} / ${groups.length}`;picked=[];$("#preGrid").innerHTML=g.map(a=>card(a.id)).join("");$("#preCount").textContent="目前選擇 0 / 3";
document.querySelectorAll("#preGrid .card").forEach(x=>x.onclick=()=>{let id=+x.dataset.id;if(picked.includes(id)){picked=picked.filter(v=>v!==id);x.classList.remove("selected");x.querySelector(".check")?.remove()}else if(picked.length<3){picked.push(id);x.classList.add("selected");let z=document.createElement("span");z.className="check";z.textContent="✓";x.querySelector(".photo").append(z)}else toast("1画面につき3人まで");$("#preCount").textContent=`選択中 ${picked.length} / 3`})}
$("#preNext").onclick=()=>{S.pre.push(...picked);gi++;if(gi<groups.length)renderPre();else{S.candidates=[...new Set(S.pre)];$("#preN").textContent=S.candidates.length;show("preDone")}}

function pairList(ids){let x=[...ids].sort(()=>Math.random()-.5),p=[];for(let i=0;i<x.length-1;i+=2)p.push([x[i],x[i+1]]);if(x.length%2)p.push([x[x.length-1],x[0]]);return p}
function startMain(){S.score={};S.candidates.forEach(id=>S.score[id]=0);S.round=1;prepareMain();show("main")}
function prepareMain(){let sorted=[...S.candidates].sort((a,b)=>S.score[b]-S.score[a]||a-b);S.pairs=S.round===1?pairList(S.candidates):pairList(sorted);S.pi=0;S.first=null;renderMain()}
function renderMain(){if(S.pi>=S.pairs.length){if(S.round<3){S.round++;prepareMain()}else show("mainDone");return}let p=S.pairs[S.pi];$("#mainTitle").textContent=`ROUND ${S.round} / 3`,$("#mainProgress").textContent=`${S.pi+1} / ${S.pairs.length}`,$("#mainPrompt").textContent=S.first===null?"① 一番好きな顔は？":"② 次に好きな顔は？";$("#mainPair").innerHTML=p.map(id=>card(id,"duel")).join("");document.querySelectorAll("#mainPair .duel").forEach(x=>x.onclick=()=>mainPick(+x.dataset.id))}
function mainPick(id){let p=S.pairs[S.pi];if(S.first===null){S.first=id;renderMain();return}if(id===S.first)return toast("請選擇其他候選人");S.score[S.first]+=2;S.score[id]++;S.pi++;S.first=null;renderMain()}

function startLast(){let sorted=[...S.candidates].sort((a,b)=>S.score[b]-S.score[a]||a-b);S.finalists=sorted.slice(0,Math.min(18,sorted.length));let b=S.finalists.slice(Math.max(0,S.finalists.length-6));S.lastPairs=pairList(b);S.li=0;S.first=null;renderLast();show("last")}
function renderLast(){if(S.li>=S.lastPairs.length){finishLast();return}let p=S.lastPairs[S.li];$("#lastPair").innerHTML=p.map(id=>card(id,"duel")).join("");document.querySelectorAll("#lastPair .duel").forEach(x=>x.onclick=()=>lastPick(+x.dataset.id))}
function lastPick(id){let p=S.lastPairs[S.li];if(S.first===null){S.first=id;return}if(id===S.first)return toast("請選擇其他候選人");S.score[S.first]+=4;S.score[id]+=2;S.li++;S.first=null;renderLast()}
function finishLast(){let sorted=[...S.candidates].sort((a,b)=>S.score[b]-S.score[a]||a-b);S.finalists=sorted.slice(0,Math.min(18,sorted.length));show("finalists")}

function startFinal(){
  // Final: stable head-to-head merge sort. Every finalist is compared directly
  // against the appropriate opponent; no arbitrary point weighting or adjacent
  // one-pass scoring is used.
  S.ranking=[];
  S.finalRuns=S.finalists.map(id=>[id]);
  S.finalNextRuns=[];
  S.finalRunIndex=0;
  S.finalJob=null;
  show("final");
  nextFinal();
}

function beginNextFinalLevel(){
  if(S.finalRuns.length<=1){
    S.ranking=S.finalRuns[0].slice(0,9);
    return result();
  }
  S.finalNextRuns=[];
  S.finalRunIndex=0;
  S.finalJob=null;
  nextFinal();
}

function nextFinal(){
  if(S.finalRuns.length<=1){
    S.ranking=S.finalRuns[0].slice(0,9);
    return result();
  }
  // Finish the current merge level.
  if(S.finalRunIndex>=S.finalRuns.length){
    S.finalRuns=S.finalNextRuns;
    return beginNextFinalLevel();
  }
  if(!S.finalJob){
    const left=S.finalRuns[S.finalRunIndex];
    const right=S.finalRuns[S.finalRunIndex+1];
    if(!right){
      S.finalNextRuns.push(left.slice());
      S.finalRunIndex+=2;
      return nextFinal();
    }
    S.finalJob={left:[...left],right:[...right],i:0,j:0,out:[]};
  }
  const j=S.finalJob;
  if(j.i>=j.left.length){
    j.out.push(...j.right.slice(j.j));
    S.finalNextRuns.push(j.out);
    S.finalRunIndex+=2; S.finalJob=null;
    return nextFinal();
  }
  if(j.j>=j.right.length){
    j.out.push(...j.left.slice(j.i));
    S.finalNextRuns.push(j.out);
    S.finalRunIndex+=2; S.finalJob=null;
    return nextFinal();
  }
  const a=j.left[j.i], b=j.right[j.j];
  $("#finalPair").innerHTML=[card(a,"duel"),card(b,"duel")].join("");
  if($("#finalPrompt")) $("#finalPrompt").textContent="你比較喜歡哪張臉？";
  if($("#finalProgress")) $("#finalProgress").textContent=`最終戰比較 · ${S.finalRunIndex/2+1}`;
  document.querySelectorAll("#finalPair .duel").forEach(x=>x.onclick=()=>finalPick(+x.dataset.id));
}

function finalPick(id){
  const j=S.finalJob;
  if(!j)return;
  const a=j.left[j.i], b=j.right[j.j];
  if(id===a){j.out.push(a);j.i++;}
  else if(id===b){j.out.push(b);j.j++;}
  else return;
  nextFinal();
}

function zhRank(i){return ["第一名","第二名","第三名","第四名","第五名","第六名","第七名","第八名","第九名"][i]||`第${i+1}名`}
function result(){let ids=S.ranking.slice(0,9);$("#resultGrid").innerHTML=ids.map((id,i)=>{let a=get(id);return `<div class="card">${init(a,i===0?"👑 第一名":zhRank(i))}<div class="name">${a.name}</div></div>`}).join("");$("#resultList").innerHTML=ids.map((id,i)=>`<li><span>${i===0?"👑 ":""}${zhRank(i)}</span><span>${get(id).name}</span></li>`).join("");show("result")}
async function copyResult(){let t="我的泰國女藝人 喜歡的臉 TOP9 👑\n"+S.ranking.slice(0,9).map((id,i)=>`${zhRank(i)} ${get(id).name}`).join("\n");try{await navigator.clipboard.writeText(t);toast("已複製結果 ♡")}catch(e){toast("無法複製")}}
