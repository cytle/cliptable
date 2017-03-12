# cliptable

经常有需要将数据从Excel之类有格式的地方copy到页面中,而页面的表格中总为单个的输入框,无法批量导入,除非上传文件到服务器.此项目方案为直接从粘贴板中读取,并且依次粘贴到输入框中.

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

