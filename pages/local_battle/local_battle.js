Page({
  data:{
    num:0,
    count2:0,
    count1:0,
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
  
  onTapButton: function () {
    this.setData({
     num:  Math.floor(Math.random()*6 + 1),
     
     },
    )},
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
   
  set1:function(e)
    {
      this.data.score1=0
      this.data.score2=0
      var count1=this.data.count1
      var count2=this.data.count2
      if(count1==0 && count2==0)
      {
        count1+=2
      }
      else {
        count1++
      }
      if(count1-count2!=2&&count2-count1!=1){
        return
      }
      this.data.count1=count1
      var index = e.currentTarget.dataset.index
      var currindex1 = this.data.currindex1
      var currindex2 = this.data.currindex2
      var cell2 = this.data.cell2
      var cell1 = this.data.cell1
      var outindex = this.data.outindex
      currindex1++
      cell1[index].type = this.data.num
      if(this.data.num==1){
      cell1[index].img = '/image/1.png'
    }   
      if(this.data.num==2)
       {
       cell1[index].img = '/image/2.png'
        } 
      if(this.data.num==3){
          cell1[index].img = '/image/3.png'
      }  

      if(this.data.num==4){
        cell1[index].img = '/image/4.png'
        }
      if(this.data.num==5){
          cell1[index].img = '/image/5.png'
          } 
      if(this.data.num==6){
          cell1[index].img = '/image/6.png'
          }   
          var f=Math.floor(index/3)
          for(var i=0;i<9;i++)
          {
            if(Math.floor(i/3)==f)
            {

              if(cell2[i].type==cell1[index].type)
              {
                this.data.currindex2--
                cell2[i].type=0
                cell2[i].img=[]
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
            this.data.score2=this.data.score2+r[j]*r[j]*j
            r[j]=0
            var score2=this.data.score2
          }
        }
        var number12=0
        for(var i=0;i<9;i++)
              {
                if(cell1[i].type!=0) number12++
              }
              if(number12==9)
              {
                if(score2>score1) wx.navigateTo({
                  url: '/pages/fail/fail',
                })
                if(score1>score2)
                wx.navigateTo({
                  url: '/pages/victory/victory',
                })
              }
        this.setData({
          cell1:cell1,
          cell2:cell2,
          currindex1:currindex1,
          currindex2:currindex2,
          outindex:!outindex,
          score2:score2,
          score1:score1,
        })
        
  },

  set2:function(e)
  {
    this.data.score1=0
    this.data.score2=0
    var count1=this.data.count1
    var count2=this.data.count2
    if(count1==0 && count2==0)
    {
      count2+=2
    }
    else {
      count2++
    }
    if(count2-count1!=2&&count1-count2!=1){
      count2--;
      return
    }
    this.data.count2=count2
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
      var number12=0
      for(var i=0;i<9;i++)
            {
              if(cell1[i].type!=0) number12++
            }
            if(number12==9)
            {
              if(score2>score1) wx.navigateTo({
                url: '/pages/fail/fail',
              })
              if(score1>score2)
              wx.navigateTo({
                url: '/pages/victory/victory',
              })
            }
      this.setData({
        cell2:cell2,
        cell1:cell1,
        currindex2:currindex2,
        currindex1:currindex1,
        outindex:!outindex,
        score1:score1,
        score2:score2,
      })
    }
})