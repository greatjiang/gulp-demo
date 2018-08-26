console.log('hello gulp!')
class A{
  constructor(val){
    this.val = val;
  }
  init(){
    console.log(this.val+1)
  }
}
new A('hello gulp~').init();