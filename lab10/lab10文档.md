# Lab10 说明文档

卞雨喆 18307110428

图片使用图床地址了。

## Exercise 7

1. PDO代码说明：

```php
<?php require_once('config.php'); ?>
  // 引入配置文件，不必重写数据库名、用户名等信息。
<!DOCTYPE html>
<html>
<body>
<h1>Database Tester (PDO)</h1> <?php

try {
  // 处理可能的连接错误。
  $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);  
  // 创建PDO实例，建立通过PDO插件与SQL的连接
  
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
  // 设置错误处理模式为：PDO::ERRMODE_EXCEPTION，除设置错误码之外，PDO 还将抛出一个 PDOException 异常类并设置它的属性来反射错误码和错误信息
  
  $sql = "select * from Artists order by LastName";
  // sql语句为查找所有Artists中的行，并用LastName排序
  
  $result = $pdo->query($sql);
  // 把查询结果设为result变量
  
  while ($row = $result->fetch()) {
    // 在能读到下一行时，循环读取下一行。
      echo $row['ArtistID'] . " - " . $row['LastName'] . "<br/>"; 
    // 写入ArtistID-LastName的一行信息
  }
  $pdo = null; 
  // 断开连接
}catch (PDOException $e) { 
  // 如果有错误，报错。
    die( $e->getMessage() );
}
?>  
</body>  
</html>
```



2. Mysqli代码说明：

```php
<?php require_once('config.php'); ?>
  // 引入配置文件，不必重写数据库名、用户名等信息。
<!DOCTYPE html>
<html>
<body>
<h1>Database Tester (mysqli)</h1> Genre:
<select>
<?php  
$connection = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME); 
// 连接数据库。
if ( mysqli_connect_errno() ) {
  // 检查是否连接
   die( mysqli_connect_error() ); 
  // 输出错误，并退出脚本
}
$sql = "select * from Genres order by GenreName"; 
// 查询内容是从Genres里面查找每一行，用GenreName排序
if ($result = mysqli_query($connection, $sql)) {
  // 找到结果时
  while($row = mysqli_fetch_assoc($result)) {
    // 从结果集中取得一行作为关联数组，循环直到取不出来
    
     echo '<option value="' . $row['GenreID'] . '">'; 
    // 写入一个选项，值为GenreID
     echo $row['GenreName'];
    // 选项的内容为GenreName
     echo "</option>";
  }
  
  // 释放内存
  mysqli_free_result($result); 
}
// 关闭数据库连接
mysqli_close($connection);
?>
</select>
</body>
</html>
```



![Exercise7-mysqli](https://gitee.com/YuzheBian/assets/raw/master/img/Exercise7-PDO.png)

![Exercise7-mysqli](https://gitee.com/YuzheBian/assets/raw/master/img/Exercise7-mysqli.png)

## Exercise8 

```php
function outputArtists() {
  // 侧边目录栏输出艺术家名字
   try {
         $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
         $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     // 连接数据库并设置错误模式，同上。
         $sql = "select * from Artists order by LastName limit 0,30";
     // 选出姓氏前30位的艺术家
         $result = $pdo->query($sql);
     // 按要求查询
         while ($row = $result->fetch()) {
           // 对每一个查询到的数据行循环
            echo '<a href="' . $_SERVER["SCRIPT_NAME"] . '?id=' . $row['ArtistID'] . '" class="';
           // 写入一个超链接元素，跳转到服务器端保存的脚本。
           
            if (isset($_GET['id']) && $_GET['id'] == $row['ArtistID']) echo 'active ';
           // 如果已经点选了这个艺术家链接， 在class里面加一个active类，显示出被点选的效果
           
            echo 'item">';
           // 统一的item类名，控制css样式
            echo $row['LastName'] . '</a>';
           // 链接显示内容是艺术家的形式
         }
         $pdo = null;
     // 断开连接
   }
   catch (PDOException $e) {
      die( $e->getMessage() );
     // 报错
   }
}
```



```php
function outputPaintings() {
  // 内容栏输出画作
    try {
        if (isset($_GET['id']) && $_GET['id'] > 0) {
          // 点选了艺术家id，且id不为空
            $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          // 连接初始化，同上
            $sql = 'select * from Paintings where ArtistId=' . $_GET['id'];
            $result = $pdo->query($sql);
      // 选出作品里艺术家id和get发送的id一样的行并查询
            while ($row = $result->fetch()) {
                outputSinglePainting($row);
              // 每一行都按照输出画作信息的格式输出
            }
            $pdo = null;
        }
    }catch (PDOException $e) {
        die( $e->getMessage() );
    }
}
```

```php
function outputSinglePainting($row) {
  // 输出单张画作的信息条目
    echo '<div class="item">';
  // 长方形盒子
    echo '<div class="image">';
    echo '<img src="images/art/works/square-medium/' .$row['ImageFileName'] .'.jpg">';
    echo '</div>';
  // 正方形画作图片
    echo '<div class="content">';
  // 右侧小长方形盒子
    echo '<h4 class="header">';
    echo $row['Title'];
    echo '</h4>';
  // 标题
    echo '<p class="description">';
    echo $row['Excerpt'];
    echo '</p>';
  // 描述
    echo '</div>'; // end class=content
    echo '</div>'; // end class=item
}
```

```php+HTML
<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Chapter 14</title>
   <link href="semantic/semantic.css" rel="stylesheet"> 
</head>
<body>
   <main class="ui container">
      <div class="ui secondary segment">
         <h1>User Input</h1>
      </div>
     // 标题栏
      <div class="ui segment">
        // 内容大块
          <div class="ui grid">
              <div class="four wide column">
                  <div class="ui link list">
                      <?php outputArtists(); ?>
                  </div>
              </div>
            // 1/4宽的左侧边栏
              <div class="twelve wide column">
                  <div class="ui items">
                      <?php outputPaintings(); ?>
                  </div>
              </div>
            // 3/4宽的右侧边栏
          </div>
      </div>
   </main>

</body>
</html>
```



![image-20200605131511599](https://gitee.com/YuzheBian/assets/raw/master/img/image-20200605131511599.png)





## Exercise9

```php
$sql = 'select * from Paintings where ArtistId=:id';
// :id表示Painting单个实例的id属性
$id = $_GET['id'];
$statement = $pdo->prepare($sql);
// 预编译
$statement->bindValue(':id', $id);
// 动态绑定
$statement->execute();
```

![image-20200605140205388](https://gitee.com/YuzheBian/assets/raw/master/img/image-20200605140205388.png)

### 三种执行sql语句方法：

1. 使用连接对象的query()方法，返回查询结果集（result set）或FALSE，多用于查询语句

2. 使用连接对象的exec()方法，返回受影响的行数，多用于执行insert\\delete\update

3. 使用语句对象的execute()方法，用于支持预处理语句（prepared statement）
	1. 安全性更好，需要多次提交情况下性能更好
	2. 需要分阶段或多步调用实现
	3. 通过位置占位符？标志（或命名占位符）和bindValue()实现
	4. 在典型的情况：只改变一个参数，多次查询时，预编译成sql语句，不必每次都重编译。可以防止用户恶意改变。



## Exercise10

```php
function outputGenres() {
   try {
      $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $sql = 'select GenreId, GenreName, Description from Genres Order By GenreId';
     // 以流派编号排序，查询流派编号、流派名、描述
      $result = $pdo->query($sql);
       while ($row = $result->fetch()) {
           outputSingleGenre($row);
       }
       $pdo = null;
   }
   catch (PDOException $e) {
      die( $e->getMessage() );
   }
}

```



```php
function outputSingleGenre($row) {
    echo '<div class="ui fluid card">';
    echo '<div class="ui fluid image">';
    $img = '<img src="images/art/genres/square-medium/' .$row['GenreId'] .'.jpg">';
    echo constructGenreLink($row['GenreId'], $img);
    echo '</div>';
    echo '<div class="extra">';
    echo '<h4>';
    echo constructGenreLink($row['GenreId'], $row['GenreName']);
    echo '</h4>';
    echo '</div>'; // end class=extra
    echo '</div>'; // end class=card
}

```



```php
function constructGenreLink($id, $label) {
  // 插入外包超链接跳转、内含img图片元素的盒子
    $link = '<a href="genre.php?id=' . $id . '">';
  // 跳转到genre.php这个php文件。根据id内容重构详情页
    $link .= $label;
    $link .= '</a>';
    return $link;
}
```





![image-20200605143544071](https://gitee.com/YuzheBian/assets/raw/master/img/image-20200605143544071.png)

