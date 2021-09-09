// 引入核心模块里面的 Component
import { Component } from '@angular/core';

@Component({
  // 使用这个组件的名称
  selector: 'app-root',
  // html
  templateUrl: './app.component.html',
  // css
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // 定义属性
  title = 'angulardemo01';
  // 构造函数
  constructor(){

  }
}
