
 



Page({
  data:{
    num:0,
    count:0,
    hidden:false,
    nocancel:false,
    timers:true,
  },
  onLoad: function (options) {
    this.reset()

  },
  reset(e){
    this.setData({
      cell1:[
        {type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]}
      ],
      cell2:[
        {type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]},{type:0,img:[]}
      ],
       defeat:false,
      outindex:false,
      currindex1:0,
      currindex2:0,
      score1:0,
      score2:0,

    })
  },  
  
  li() {
    this.setData({
     num:  Math.floor(Math.random()*6 + 1),
     count: this.data.count+1
     },
    )},

// 开始按钮
btnStart(){
  if(this.data.timers){
    this.data.timers = false
      console.log("0"+"")
    this.data.timers = setInterval(()=>{
      this.li()
    },200)
  }
},
  // 停止按钮
  btnEnd(){
    clearInterval(this.data.timers)
    this.data.timers = true
  },

  set2:function(e)
  {

    //number为检测双方棋盘是否已满的变量
    var number1=0
    var number2=0

    this.data.score1=0
    this.data.score2=0
    if(this.data.count<1) return
    var index = e.currentTarget.dataset.index
    var currindex2 = this.data.currindex2
    var currindex1 = this.data.currindex1
    var cell2 = this.data.cell2
    var cell1 = this.data.cell1
    var outindex = this.data.outindex
    currindex2++

    cell2[index].type = this.data.num
  
    if(this.data.num==1){
      cell2[index].img = '/image/1.png'
    }   
      if(this.data.num==2)
       {
       cell2[index].img = '/image/2.png'
        } 
      if(this.data.num==3){
          cell2[index].img = '/image/3.png'
      }  

      if(this.data.num==4){
        cell2[index].img = '/image/4.png'
        }
      if(this.data.num==5){
          cell2[index].img = '/image/5.png'
          } 
      if(this.data.num==6){
          cell2[index].img = '/image/6.png'
      } 
      // 消除
      var f=Math.floor(index/3)
      for(var i=0;i<9;i++)
      {
        if(Math.floor(i/3)==f)
        {

          if(cell1[i].type==cell2[index].type)
          {
            this.data.currindex1--
            cell1[i].type=0
            cell1[i].img=[]
          }
        }
      }

      // 计算此时player1、player2的棋盘分数
      var r =[7]
      for(var j=1;j<7;j++)
      r[j]=0
      for(var i=0;i<3;i++)
      {
        for(var j=0;j<3;j++)
        {
          r[cell1[i*3+j].type]++
        }
        for(var j=1;j<7;j++)
        {
          this.data.score1+=r[j]*r[j]*j
          r[j]=0
          var score1=this.data.score1
        }
      }
      for(var i=0;i<3;i++)
      {
        for(var j=0;j<3;j++)
        {
          r[cell2[i*3+j].type]++
        }
        for(var j=1;j<7;j++)
        {
          this.data.score2+=r[j]*r[j]*j
          r[j]=0
          var score2=this.data.score2
        }
      }
      
      // 开始检测玩家棋盘是否满
      for(var i=0;i<9;i++)
      {
        if(cell2[i].type!=0) number2++
      }
      // console.log(number2)
      if(number2==9)
      {
        
        if(score1>score2) wx.navigateTo({
          url: '/pages/fail/fail',
        })
        if(score2>score1)
        wx.navigateTo({
          url: '/pages/victory/victory',
        })
      }
      setTimeout(()=>{
        
        
        //延迟后进行的操作
     },100000)  //delayTime是延迟时间，以毫秒为单位，1000ms=1s
      



// 高级AI


















// AI算法
      var flag2=0
      var tamp
      var ket
      var flag=0
      var ketnum
      var num=Math.floor(Math.random()*6+ 1)
      for(var i=0;i<100;i++)
      {
        i=Math.floor(Math.random()*9)
        for(var j=0;j<9;j++)
        {
          if(num==cell2[j].type)
          {
           
            ket = j
            flag++
            break
          }
        }
        if(flag>0)
        {
        ket = ket/3
        for(var j=ket*3;j<ket*3+3;j++)
        {
          if(cell1[j].type==0) 
          {
            
            i=j
            break
          }
        }
        }
        if(cell1[i].type==0) 
        {
          flag2=1
          cell1[i].type=num
          if(num==1){
            cell1[i].img = '/image/1.png'
          }   
            if(num==2)
             {
             cell1[i].img = '/image/2.png'
              } 
            if(num==3){
                cell1[i].img = '/image/3.png'
            }  
      
            if(num==4){
              cell1[i].img = '/image/4.png'
              }
            if(num==5){
                cell1[i].img = '/image/5.png'
                } 
            if(num==6){
                cell1[i].img = '/image/6.png'
            } 
          }

          if(flag2>0)
          {
            tamp=i
            break
          }
      }   
      var f=Math.floor(tamp/3)
      for(var i=0;i<9;i++)
      {
        if(Math.floor(i/3)==f)
        {

          if(cell2[i].type==cell1[tamp].type)
          {
            this.data.currindex1--
            cell2[i].type=0
            cell2[i].img=[]
          }
        }
      }
      this.data.score1=0
      this.data.score2=0
      // 计算此时player1、player2的棋盘分数
      var r =[7]
      for(var j=1;j<7;j++)
      r[j]=0
      for(var i=0;i<3;i++)
      {
        for(var j=0;j<3;j++)
        {
          r[cell1[i*3+j].type]++
        }
        for(var j=1;j<7;j++)
        {
          this.data.score1+=r[j]*r[j]*j
          r[j]=0
          var score1=this.data.score1
        }
      }
      for(var i=0;i<3;i++)
      {
        for(var j=0;j<3;j++)
        {
          r[cell2[i*3+j].type]++
        }
        for(var j=1;j<7;j++)
        {
          this.data.score2+=r[j]*r[j]*j
          r[j]=0
          var score2=this.data.score2
        }
      }
            // 开始检测电脑棋盘是否满
            for(var i=0;i<9;i++)
            {
              if(cell1[i].type!=0) number1++
            }
            console.log(number1)
            if(number1==9)
            {
              if(score2>score1) wx.navigateTo({
                url: '/pages/victory/victory',
              })
              if(score1>score2)
              wx.navigateTo({
                url: '/pages/fail/fail',
              })
                    for(var i=0;i<9;i++)
      {
        if(cell1[i].type!=0) number1++
      }
      

      


      
            }
      this.setData({
        cell2:cell2,
        cell1:cell1,
        currindex2:currindex2,
        currindex1:currindex1,
        outindex:!outindex,
        score1:score1,
        score2:score2,
        num:num,
        count:0,
      })
    }
  
})

// if(this.data.num==1){
//   cell1[index].img = '/image/1.png'
// }   
//   if(this.data.num==2)
//    {
//    cell1[index].img = '/image/2.png'
//     } 
//   if(this.data.num==3){
//       cell1[index].img = '/image/3.png'
//   }  

//   if(this.data.num==4){
//     cell1[index].img = '/image/4.png'
//     }
//   if(this.data.num==5){
//       cell1[index].img = '/image/5.png'
//       } 
//   if(this.data.num==6){
//       cell1[index].img = '/image/6.png'
//       }   