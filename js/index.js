const loadCategorys = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then( data => showCategorys(data.data.news_category))
}
loadCategorys();

const showCategorys = categorys => {
    const categoryContainer = document.getElementById('catagory-container');
      categorys.forEach(category => {
        const catagoryList = document.createElement('li');
              catagoryList.innerHTML = `<a onclick = "getId(${category.category_id})"> ${category.category_name}</a>`;
              categoryContainer.appendChild(catagoryList);
    });
};
// showCategorys();

const getId = (id) =>{
    // console.log( id);
    toggleSpiner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
    .then(res => res.json())
    .then( data => getNews(data.data))
     const getNews = allNews =>{
        const newsCcontainer = document.getElementById('news-container');
        newsCcontainer.innerHTML=``;
        allNews.forEach(news =>{
            // console.log(news);
            const {_id, title, author, thumbnail_url, image_url, details, total_view} = news;
            const sortDetails = details.slice(0,100) + '...';
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('col-lg-6');
            newsDiv.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text text-ellipsis"> ${sortDetails}</p>
                  
                </div>
              </div>
              <div class="card-footer d-lg-flex justify-content-between align-items-center">
                <div class="author-info d-lg-flex ">
                <img class="author-img me-3" src=" ${author.img}" alt="">
                
                  <p>${author.name != null ? author.name : 'name not found'} <br> <span class="text-muted">${author.published_date != null ? author.published_date : 'date not found'}</span> </p>
                </div>
                  <p><i class="fa-solid fa-eye"></i> ${total_view} </p>
                  
                  <button type="button"  onclick ="getNewsDetils('${_id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i style="color:#7676f7; font-size:25px;" class="fa-sharp fa-solid fa-arrow-right"></i>
                 </button>
                
                
              </div>
            </div>
          </div>
         
        `;
        newsCcontainer.appendChild(newsDiv);
        toggleSpiner(false)
        
        // console.log(showNewsDetils());
        // const showNewsDetils = 
        });
     };
    
};

const toggleSpiner = isLoading => {
  const loaderDiv = document.getElementById('spiner');
  if( isLoading){
    loaderDiv.classList.remove('d-none');
  }
  else{
    loaderDiv.classList.add('d-none');
  }

};


const getNewsDetils = (newsId) =>{
  const url = `  https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
    .then(res => res.json())
    .then( data => showDetails(data.data))
  //  console.log(newsId);

   const showDetails = details => {
     details.forEach( detail => {
      const {_id, title, author, thumbnail_url, image_url, details, total_view} = detail;
      const modalBox = document.getElementById('modal-div')
       modalBox.innerHTML = `
       <div class="card mb-3">
        
          <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
        
        <div class="col">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text text-ellipsis"> ${details}</p>
            
          </div>
        </div>
        <div class="card-footer d-lg-flex justify-content-between align-items-center">
          <div class="author-info d-lg-flex ">
          <img class="author-img me-3" src=" ${author.img}" alt="">
          
            <p>${author.name != null ? author.name : 'name not found'} <br> <span class="text-muted">${author.published_date != null ? author.published_date : 'date not found'}</span> </p>
          </div>
            <p><i class="fa-solid fa-eye"></i> ${total_view} </p>
        </div>
      `;
      
      
     })
   }
} 
                  
                   
