

// ボタンの状態管理・判定
let isUnitActive = {};
function activeateCalcBtn(){
  let isEveryUnitSelected = Object.keys(isUnitActive).reduce(
    (mlt,i)=>mlt*(Object.keys(isUnitActive[i]).reduce(
      (sum,j)=>sum+isUnitActive[i][j]
    ,0))
  ,1);
  if(isEveryUnitSelected){
    console.log(document.querySelectorAll('.calc .btn')[0].classList);
    document.querySelectorAll('.calc .btn')[0].classList.remove('disabled');
  } else {
    document.querySelectorAll('.calc .btn')[0].classList.add('disabled');
  }
}

// 方向ボタンの排他処理
var units = document.querySelectorAll('.item.unit');
for(let t = units.length-1; t>=0; t--){
let keyUnitTemp = units[t].querySelectorAll('.cube-i')[0].textContent
isUnitActive[keyUnitTemp] = {};
var unitBtnsTemp = units[t].querySelectorAll('.btn');
for(let u = unitBtnsTemp.length-1; u>=0; u--){
  isUnitActive[keyUnitTemp][unitBtnsTemp[u].classList[2]] = unitBtnsTemp[u].classList.contains('active');
  unitBtnsTemp[u].addEventListener("click", function(){
    let unitBtns = this.parentNode.parentNode.parentNode.querySelectorAll('.face .btn')
    for(let v = unitBtns.length-1; v>=0; v--){
    if(unitBtns[v].classList.contains('active') && unitBtns[v]!=this){
    unitBtns[v].classList.remove('active');
    }
    let keyUnit = unitBtns[v].parentNode.parentNode.parentNode.querySelectorAll('.cube-i')[0].textContent
    let keyFace = unitBtns[v].classList[3]
    isUnitActive[keyUnit][keyFace] = unitBtns[v].classList.contains('active');
    }
    activeateCalcBtn()
  });
}
}


// 解法取得・表示処理
let faceDirCorrespondance = {'face-u':'奥', 'face-d':'前', 'face-l':'左', 'face-r':'右'};
function getFaceDirectino(){
  delete isUnitActive['G']
  isUnitActive = Object.assign({}, ...Object.keys(isUnitActive).sort().map(
    (k)=>({[k]: isUnitActive[k]})));
  let faceDirectionList = Object.keys(isUnitActive).reduce(
    (acc1,i)=>[...acc1, (Object.entries(isUnitActive[i]).reduce(
      (acc2, [key,value])=> value ? acc2 + key : acc2
    ,''))]
  ,[]);
  faceDir4words = faceDirectionList.reduce((acc,d)=> acc + faceDirCorrespondance[d],'');
  return faceDir4words;
}
function findCue(dir4words){
  // 本当はここで毎回探索させようかと思っていだけれど書き直すのが面倒なので手抜きする

  return cueMap[dir4words]
}
function showCue(cueText){
  document.querySelector('#shuffle').textContent = cueText;
  var shuffles = new ShuffleText(document.querySelector('#shuffle'));
  shuffles.start();
  document.querySelector('#cursor').textContent = '▶︎'
}
document.querySelectorAll('.calc .btn')[0].addEventListener("click", function(){
  dir4words = getFaceDirectino()
  cueText = findCue(dir4words)
  showCue(cueText)
});



const cueMap = {
   '前前前前': 'AAAA',
   '前前前右': 'DCBADCCADAB',
   '前前前奥': 'CCDAAD',
   '前前前左': 'ADCBB',
   '前前右前': 'DCBDDABCCBA',
   '前前右右': 'DCDBAC',
   '前前右奥': 'DBBCB',
   '前前右左': 'BAAA',
   '前前奥前': 'CCBDDB',
   '前前奥右': 'ACDAA',
   '前前奥奥': 'BBAA',
   '前前奥左': 'DCCDDAC',
   '前前左前': 'DAABC',
   '前前左右': 'BBBA',
   '前前左奥': 'DDDBCCC',
   '前前左左': 'ACBDBAADBC',
   '前右前前': 'DBCDABCACBA',
   '前右前右': 'CDAABC',
   '前右前奥': 'BBBCA',
   '前右前左': 'DDDB',
   '前右右前': 'ADBCCB',
   '前右右右': 'C',
   '前右右奥': 'DABBADAD',
   '前右右左': 'CDACACD',
   '前右奥前': 'CBAAA',
   '前右奥右': 'DABDBABD',
   '前右奥奥': 'CDCDBAC',
   '前右奥左': 'DCBBBC',
   '前右左前': 'DDAD',
   '前右左右': 'DDCCBCB',
   '前右左奥': 'ADCACA',
   '前右左左': 'ABCAB',
   '前奥前前': 'ABCCBA',
   '前奥前右': 'CDDDA',
   '前奥前奥': 'BDDB',
   '前奥前左': 'DACCAAC',
   '前奥右前': 'DCDDB',
   '前奥右右': 'AABDBBAD',
   '前奥右奥': 'BCCDACA',
   '前奥右左': 'BACBBC',
   '前奥奥前': 'ADAD',
   '前奥奥右': 'DBCACBC',
   '前奥奥奥': 'CC',
   '前奥奥左': 'DACABDADB',
   '前奥左前': 'BDCCBBC',
   '前奥左右': 'ABACAC',
   '前奥左奥': 'ABCDBDDAB',
   '前奥左左': 'BADD',
   '前左前前': 'DCBDA',
   '前左前右': 'DBBB',
   '前左前奥': 'ACBCCAA',
   '前左前左': 'CDBDACABBD',
   '前左右前': 'AAAD',
   '前左右右': 'BBAACCC',
   '前左右奥': 'DCCDAD',
   '前左右左': 'CBDDB',
   '前左奥前': 'BCBCBCA',
   '前左奥右': 'DCDBCD',
   '前左奥奥': 'DBBAACBDA',
   '前左奥左': 'ADAB',
   '前左左前': 'BDADCDAABC',
   '前左左右': 'CDAAD',
   '前左左奥': 'ABBD',
   '前左左左': 'CCC',
   '右前前前': 'ADADDBACBBC',
   '右前前右': 'DABCAD',
   '右前前奥': 'DABBB',
   '右前前左': 'BCCC',
   '右前右前': 'BDCBDA',
   '右前右右': 'D',
   '右前右奥': 'ABCACACB',
   '右前右左': 'CCDADDA',
   '右前奥前': 'BAAAD',
   '右前奥右': 'BBBAACCC',
   '右前奥奥': 'CADCDDB',
   '右前奥左': 'BBCBDD',
   '右前左前': 'ACCC',
   '右前左右': 'DCDDBBC',
   '右前左奥': 'AAADDC',
   '右前左左': 'BBADA',
   '右右前前': 'ADBCBA',
   '右右前右': 'A',
   '右右前奥': 'DBBDDCCC',
   '右右前左': 'DADCACA',
   '右右右前': 'B',
   '右右右右': 'BDCBADCCADAB',
   '右右右奥': 'DCDAABC',
   '右右右左': 'BADCBB',
   '右右奥前': 'CCAADDDC',
   '右右奥右': 'CBDCBDA',
   '右右奥奥': 'CD',
   '右右奥左': 'ABABA',
   '右右左前': 'DBBDCCB',
   '右右左右': 'AACBDA',
   '右右左奥': 'ABBBA',
   '右右左左': 'BDCCDDAC',
   '右奥前前': 'ABDDD',
   '右奥前右': 'BBDCCCDB',
   '右奥前奥': 'ABCCADA',
   '右奥前左': 'BABCAB',
   '右奥右前': 'CDADCACA',
   '右奥右右': 'BAABCCD',
   '右奥右奥': 'AC',
   '右奥右左': 'DDBBD',
   '右奥奥前': 'DBACBBC',
   '右奥奥右': 'BC',
   '右奥奥奥': 'BBDDDAABA',
   '右奥奥左': 'CBCCDAAD',
   '右奥左前': 'AABABC',
   '右奥左右': 'DADDA',
   '右奥左奥': 'BCDCDBAC',
   '右奥左左': 'CCD',
   '右左前前': 'DCCC',
   '右左前右': 'CAAABCB',
   '右左前奥': 'CDADDA',
   '右左前左': 'BDDAB',
   '右左右前': 'BACCBAB',
   '右左右右': 'ADCDDB',
   '右左右奥': 'BBDBD',
   '右左右左': 'CABCCADA',
   '右左奥前': 'DBDDCB',
   '右左奥右': 'DAAAD',
   '右左奥奥': 'CAADBCCB',
   '右左奥左': 'ACC',
   '右左左前': 'ABADD',
   '右左左右': 'BDBCACBC',
   '右左左奥': 'CBC',
   '右左左左': 'AABCDBDDAB',
   '奥前前前': 'BBADAD',
   '奥前前右': 'CCDAC',
   '奥前前奥': 'BCCB',
   '奥前前左': 'CADADDA',
   '奥前右前': 'CCBCD',
   '奥前右右': 'CBCBAABA',
   '奥前右奥': 'ADBCDAD',
   '奥前右左': 'ABBDBD',
   '奥前奥前': 'CACA',
   '奥前奥右': 'CDBDDAB',
   '奥前奥奥': 'DD',
   '奥前奥左': 'CDABCACBA',
   '奥前左前': 'BDBDDCB',
   '奥前左右': 'DDAABA',
   '奥前左奥': 'CBBAABCCD',
   '奥前左左': 'ACBC',
   '奥右前前': 'CACBC',
   '奥右前右': 'BDCDDBBC',
   '奥右前奥': 'ADABCAD',
   '奥右前左': 'BBBADA',
   '奥右右前': 'DCAAADDC',
   '奥右右右': 'DACABBD',
   '奥右右奥': 'AD',
   '奥右右左': 'BBCCC',
   '奥右奥前': 'BBACBDD',
   '奥右奥右': 'DB',
   '奥右奥奥': 'ABBBAACCC',
   '奥右奥左': 'ACADCDDB',
   '奥右左前': 'ABDBAA',
   '奥右左右': 'AACCC',
   '奥右左奥': 'DCBDCBDA',
   '奥右左左': 'DDC',
   '奥奥前前': 'DCDC',
   '奥奥前右': 'BAACBDA',
   '奥奥前奥': 'AA',
   '奥奥前左': 'DBCDCDBAC',
   '奥奥右前': 'DBABCBA',
   '奥奥右右': 'AB',
   '奥奥右奥': 'CBDCDDBBC',
   '奥奥右左': 'ADCDAABC',
   '奥奥奥前': 'BB',
   '奥奥奥右': 'CDCDDACAA',
   '奥奥奥奥': 'DDABCCBA',
   '奥奥奥左': 'CAD',
   '奥奥左前': 'CDCDDBCAA',
   '奥奥左右': 'BACCBDDB',
   '奥奥左奥': 'CDB',
   '奥奥左左': 'ABABAB',
   '奥左前前': 'BCBAABA',
   '奥左前右': 'DABADD',
   '奥左前奥': 'CDBCCBDBA',
   '奥左前左': 'CCDB',
   '奥左右前': 'DBDDAB',
   '奥左右右': 'DCCCD',
   '奥左右奥': 'DCAAABCB',
   '奥左右左': 'ACA',
   '奥左奥前': 'ADBCCDACA',
   '奥左奥右': 'BBAABCCD',
   '奥左奥奥': 'CAB',
   '奥左奥左': 'BDDDBB',
   '奥左左前': 'CCAD',
   '奥左左右': 'CBB',
   '奥左左奥': 'ADADDA',
   '奥左左左': 'BCBCCDAAD',
   '左前前前': 'CDBAC',
   '左前前右': 'BBCB',
   '左前前奥': 'DDDAABA',
   '左前前左': 'DCBBAABCCD',
   '左前右前': 'AACA',
   '左前右右': 'BDABADD',
   '左前右奥': 'ADCCCD',
   '左前右左': 'DBCCB',
   '左前奥前': 'BDDBBDA',
   '左前奥右': 'BDDCCC',
   '左前奥奥': 'ABBCAACDB',
   '左前奥左': 'AABC',
   '左前左前': 'CBADCCADAB',
   '左前左右': 'CDACA',
   '左前左奥': 'BCAB',
   '左前左左': 'DDD',
   '左右前前': 'DDCD',
   '左右前右': 'ABBADAD',
   '左右前奥': 'CCDACA',
   '左右前左': 'BCBCA',
   '左右右前': 'ABDBBAD',
   '左右右右': 'ACCBCD',
   '左右右奥': 'CBBBC',
   '左右右左': 'BCADADDA',
   '左右奥前': 'DCCBBC',
   '左右奥右': 'CAACA',
   '左右奥奥': 'CDDBABDA',
   '左右奥左': 'ADD',
   '左右左前': 'ACACB',
   '左右左右': 'BCDBDDAB',
   '左右左奥': 'DDB',
   '左右左左': 'DABBBAACCC',
   '左奥前前': 'ABBBADA',
   '左奥前右': 'BAACCC',
   '左奥前奥': 'BDCBDCBDA',
   '左奥前左': 'CDDB',
   '左奥右前': 'BCACBC',
   '左奥右右': 'DDCDC',
   '左奥右奥': 'ACABDADB',
   '左奥右左': 'AAD',
   '左奥奥前': 'DADCDAABC',
   '左奥奥右': 'BDACABBD',
   '左奥奥奥': 'BDA',
   '左奥奥左': 'CCBBCB',
   '左奥左前': 'DDAC',
   '左奥左右': 'BBD',
   '左奥左奥': 'ACCAAC',
   '左奥左左': 'DCBAACBDD',
   '左左前前': 'DCBDACDBAC',
   '左左前右': 'CDDAC',
   '左左前奥': 'DCBB',
   '左左前左': 'AAA',
   '左左右前': 'DCCDB',
   '左左右右': 'BBAACBDA',
   '左左右奥': 'ABA',
   '左左右左': 'BDCBADCCDB',
   '左左奥前': 'DACA',
   '左左奥右': 'BBA',
   '左左奥奥': 'CDDCDC',
   '左左奥左': 'BADCCADAB',
   '左左左前': 'BBB',
   '左左左右': 'DADBCCDACA',
   '左左左奥': 'BDDABCCBA',
   '左左左左': 'DBAC'
}




















