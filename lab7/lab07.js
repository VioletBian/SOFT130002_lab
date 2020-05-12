const works = [
    { author: "Micheal Jackson",lifetime:"1022-1055",tips: "Human", photos: ["human1.jpg","human2.jpg","human3.jpg"] },
    { author: "Maria JK",lifetime:"1920-2001", tips: "Classical", photos: ["classical1.jpg","classical2.jpg"] },
    { author: "John Herry UY", lifetime:"1894-1928",tips: "Abstract", photos: ["abstract1.jpg","abstract2.jpg","abstract3.jpg","abstract4.jpg","abstract5.jpg"] },
    { author: "Coco",lifetime:"1777-1799", tips: "Beauty",  photos: ["beauty1.jpg","beauty2.jpg"] }
];
var container = document.getElementsByClassName("flex-container").item(0);
for (let i = 0; i < 4; i++){
    // 四个深紫色div之一
    var div = document.createElement("div");
    div.className = "item";
    container.appendChild(div);
    

    // Genre：tips块
    var genre = document.createElement("h4");
    genre.innerText = "Genre" + " : " + works[i].tips;
    div.appendChild(genre);
    

    // 作者信息蓝底块
    var authorBox = document.createElement("div");
    authorBox.className = "inner-box";
    div.appendChild(authorBox);
    // 作者信息块之作者名字
    var authorName = document.createElement("h3");
    authorName.innerText = works[i].author;
    authorName.style.display = "inline";
    // 作者信息块之作者生卒
    var authorLifetime = document.createElement("h5");
    authorLifetime.innerText = "lifetime:" + works[i].lifetime;
    authorLifetime.style.display = "inline";
    authorLifetime.style.marginLeft = "1em";
    // 添加进作者信息块
    authorBox.appendChild(authorName);
    authorBox.appendChild(authorLifetime);
    
    // 照片蓝底块
    var photosBox = document.createElement("div");
    photosBox.className = "inner-box";
    div.appendChild(photosBox);
    // 照片label
    var label = document.createElement("h3");
    label.innerText = "Popular Photos";
    photosBox.appendChild(label);
    // 三张照片代表
    for(let j = 0; j < works[i].photos.length; j++){
        var img = document.createElement("img");
        photosBox.appendChild(img);
        img.className = "photo";
        img.src = works[i].photos[j];
        img.style.display = "inline-box";
    }



    var button = document.createElement("button");
    button.innerHTML = "Visit";
    div.appendChild(button);

}