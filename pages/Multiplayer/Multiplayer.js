
 



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
     var score4=0 //递归中的机器人的成绩
     var score5=0 //递归过程中的人的成绩
     var score_1=-100//第一行的权重值
     var score_2=-100//第二行的权重值
     var score_3=-100//第三行的权重值//当这一行满了则权重值为-100
     var flag1=0 //第一行有几个空位
     var flag2=0 //第一行有几个空位
     var flag3=0 //第一行有几个空位
     var num=Math.floor(Math.random()*6+ 1)//随机的一个数
     var temp=[]//检索有0的格子
     for(var i=0;i<9;i++)
     temp[i]=0
     for(var i=0;i<9;i++){
       if(cell1[i].type==0){
         temp[i]=1
       }
     }
     var cell3=[]
     var cell4=[]
     for(var i=0;i<3;i++)
     if(cell1[i].type==0) flag1+=2
     for(var i=3;i<6;i++)
     if(cell1[i].type==0) flag2+=2
     for(var i=6;i<9;i++)
     if(cell1[i].type==0) flag3+=2
     for(var i=0;i<9;i++)
     cell3[i] =cell1[i].type
     for(var i=0;i<9;i++)
      cell4[i]=cell2[i].type
     for(var i=0;i<3;i++){
      score4=0 
      score5=0
       if(score_1!=-100) break
       if(temp[i]){
         score_1=0
         cell3[i] = num
         var f=Math.floor(i/3)
         for(var j=0;j<9;j++)
         {
           if(Math.floor(j/3)==f)
           {
             if(cell4[j]==cell3[i])
             {
               cell4[j]=0
             }
           }
         }
        var r =[7]
        for(var j=1;j<7;j++)
        r[j]=0
        for(var i=0;i<3;i++)
        {
          for(var j=0;j<3;j++)
          {
            r[cell3[i*3+j]]++
          }
          for(var j=1;j<7;j++)
          {
            score4+=r[j]*r[j]*j
            r[j]=0
          }
        }
        for(var i=0;i<3;i++)
        {
          for(var j=0;j<3;j++)
          {
            r[cell4[i*3+j]]++
          }
          for(var j=1;j<7;j++)
          {
            score5+=r[j]*r[j]*j
            r[j]=0
          }
        }
        console.log(score4)
        console.log(score5)
        score_1=score4-score5
       }
     }

     var cell3=[]
     var cell4=[]
     for(var i=0;i<9;i++)
     cell3[i] =cell1[i].type
     for(var i=0;i<9;i++)
      cell4[i]=cell2[i].type
     for(var i=3;i<6;i++){
      score4=0 
      score5=0
      if(score_2!=-100) break
      if(temp[i]){
        score_2=0
        cell3[i] = num
        var f=Math.floor(i/3)
        for(var j=0;j<9;j++)
        {
          if(Math.floor(j/3)==f)
          {
            if(cell4[j]==cell3[i])
            {
              cell4[j]=0
            }
          }
        }
       var r =[7]
       for(var j=1;j<7;j++)
       r[j]=0
       for(var i=0;i<3;i++)
       {
         for(var j=0;j<3;j++)
         {
           r[cell3[i*3+j]]++
         }
         for(var j=1;j<7;j++)
         {
           score4+=r[j]*r[j]*j
           r[j]=0
         }
       }
       for(var i=0;i<3;i++)
       {
         for(var j=0;j<3;j++)
         {
           r[cell4[i*3+j]]++
         }
         for(var j=1;j<7;j++)
         {
           score5+=r[j]*r[j]*j
           r[j]=0
         }
       }
       console.log(score4)
       console.log(score5)
       score_2=score4-score5
      }
    }
    var cell3=[]
    var cell4=[]
    for(var i=0;i<9;i++)
    cell3[i] =cell1[i].type
    for(var i=0;i<9;i++)
     cell4[i]=cell2[i].type
    for(var i=6;i<9;i++){
      score4=0 
      score5=0
      if(score_3!=-100) break
      if(temp[i]){
        score_3=0
        cell3[i] = num
        var f=Math.floor(i/3)
        for(var j=0;j<9;j++)
        {
          if(Math.floor(j/3)==f)
          {
            if(cell4[j]==cell3[i])
            {
              cell4[j]=0
            }
          }
        }
       var r =[7]
       for(var j=1;j<7;j++)
       r[j]=0
       for(var i=0;i<3;i++)
       {
         for(var j=0;j<3;j++)
         {
           r[cell3[i*3+j]]++
         }
         for(var j=1;j<7;j++)
         {
           score4+=r[j]*r[j]*j
           r[j]=0
         }
       }
       for(var i=0;i<3;i++)
       {
         for(var j=0;j<3;j++)
         {
           r[cell4[i*3+j]]++
         }
         for(var j=1;j<7;j++)
         {
           score5+=r[j]*r[j]*j
           r[j]=0
         }
       }
       console.log(score4)
       console.log(score5)
       score_3=score4-score5
      }
    }
    console.log(score_1)
    console.log(score_2)
console.log(score_3)
    var tamp =0
    var flag=0
    score_1+=flag1
    score_2+=flag2
    score_3+=flag3
    if(score_1==score_2 ){
       var num1=Math.floor(Math.random()*3+ 1)
       if(num1 == 1) score_1++
       if(num1 == 2) score_2++
       if(num1 == 3) score_3++
    }
    if(score_1>=score_2){
      if(score_1>=score_3 && flag==0){
        flag=1
        for(var i=0;i<3;i++)
        if(temp[i]){
          tamp=i
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
            break
        }
      }
    }
    if(score_3>=score_1){
      if(score_3>=score_2 && flag ==0){
        flag=1
        for(var i=6;i<9;i++)
        if(temp[i]){
          tamp=i
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
            break
        }
      }
    }
    if(score_2>=score_3){
      if(score_2>=score_1 && flag==0){
        flag=1
        for(var i=3;i<6;i++)
        if(temp[i]){
          tamp=i
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
            break
        }
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