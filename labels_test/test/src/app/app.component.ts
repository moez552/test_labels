import { Component, OnInit } from '@angular/core';
import { label } from './label';
import {HttpClient} from '@angular/common/http';
import { saveAs } from 'file-saver';

  
// Data which will write in a file.

  
// Write data in 'Output.txt' .


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private http : HttpClient){
     
  }
  ngOnInit(): void {


     this.http.get('http://127.0.0.1:8000/test')
    .subscribe((Response:any) => {this.text=Response.text
    this.json={'document':this.text,'annotation':[]}})

  }
    text:any;
  title = 'test';
  error=''
  labels: label[] = [];
  id = -1;
  selectLabel :number =-1;
  color='green'
 colors = ['red','blue','green','yellow','black'];
 json:any;

 select_text(e:any){
console.log('here')
var x = window.getSelection()?.getRangeAt(0)
console.log(x?.toString())


   var selected_text =x?.toString() || ''
   if(selected_text=='' || selected_text==' '){return;}
   var index = this.text.indexOf(selected_text)
   var start =index
   var end = index+selected_text.length
   console.log(start,'  ',end)
   if(start==end){return;}
   if(this.selectLabel==-1){this.error='you need to select a label first'
  return;}

  console.log(selected_text)
  console.log(this.text[end+1])
  console.log(selected_text[0]==' ', this.text[start-1]==' ', start==0,selected_text[selected_text.length-1]==' ', this.text[end+1]==' ', end==this.text.length)
  if((selected_text[0]==' ' || this.text[start-1]==' ' || start==0) &&
   (selected_text[selected_text.length-1]==' ' || this.text[end]==' ' || end==this.text.length)){
console.log('valid')
console.log(start,'  ',end)
this.json.annotation.push({'start':start,'end':end,'label':this.labels[this.selectLabel].name,'text':selected_text})
document.designMode = "on";
document.execCommand("BackColor", false, this.colors[this.selectLabel]);
document.designMode = "off";
  } else {this.error='Invalid selection'}
  

 }
   select(id:number){
     this.selectLabel=id
  }
  addLabel(s:string){
    if(s==''){
      this.error= "you can't add an empty label"
    }else{
      this.id = this.id +1
    this.labels.push({'id':this.id,'name':s,'color':'red'})
    }

  }
  getColor(id:any){return this.colors[id]}

  export_json(){
    console.log(this.json)
    var myJSON = JSON.stringify(this.json);

    const blob = new Blob([myJSON],  {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'json.txt');
  

  }
}
