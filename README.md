# cliptable
Excel之类有格式的数据copy到table中

## 使用
```javascript
var table = document.querySelector('table');

cliptable(table[, options]);
```

### OPTIONS

|属性|备注|
|---|---|
|inputSelector|input筛选,string(在设置数据时使用,默认为：'input')|
|trSelector|tr筛选,string|
|tdSelector|td筛选,string|
|trOverflowCallback |行溢出回调函数，数据数大于行数情况下执行|
|tdOverflowCallback |列溢出回调函数，数据数大于列数情况下执行|

