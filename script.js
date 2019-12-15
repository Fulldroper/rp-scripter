let inputSize = 2;
const maxCMDSize = 210;
let worckspace;
let blocks;
let more;
let generate;
let result;
let scriptName;

function initLincks() {
    worckspace = document.getElementById('worckspace');
    blocks = document.getElementsByClassName('block');
    more = document.getElementById('more');
    generate = document.getElementById('generate');
    result = document.getElementById('result');
    scriptName = document.getElementById('script-name').value;
}
function addInput() {
    inputSize++
    const input = document.createElement('input');
    const li = document.createElement('li');
    input.classList.add("block")
    input.type="text"
    li.appendChild(input)
    worckspace.appendChild(li)
}
function getCMDs() {
    let arr = [];
    let result = [`alias ${scriptName ? scriptName : 'script'}_toggle ${scriptName ? scriptName : 'script'}0;`];
    let blocksArray = Object.values(blocks)
    blocksArray.forEach(el => arr.push(el.value));
    arr.forEach((el,i)=>{
        result.push(`alias ${scriptName ? scriptName : 'script'}${i} "${el};alias ${scriptName ? scriptName : 'script'}_toggle ${scriptName ? scriptName : 'script'}${i >= arr.length-1 ? 0 : i+1}";`)
    })
    return result;
}
function compileResult(arr,border){
    let temp='';
    arr.forEach(el=>temp+=el+`${border}`)
    return temp;
}
function generateResult() {
    blocks = document.getElementsByClassName('block')
    scriptName = document.getElementById('script-name').value;
    result.innerHTML=compileResult(getCMDs(),'</br>')
    document.getElementById('result-download').innerHTML=`<a id="download">download as file *.cfg</a>`
    document.getElementById('download').onclick=()=>{
        download(scriptName+".cfg",compileResult(getCMDs(),'\n'))
    }
}
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
window.onload=()=>{
    initLincks();
    more.onclick=addInput;
    generate.onclick=generateResult;
}