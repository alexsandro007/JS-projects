/*=============== LOGIN ===============*/

const loginButton = document.getElementById('login_button');
const loginClose = document.getElementById('login-close');
const loginContent = document.getElementById('login-content');

if(loginButton){
    loginButton.addEventListener('click', () =>{
        loginContent.classList.add('show-login');
    })
}

if(loginClose){
    loginClose.addEventListener('click', () =>{
        loginContent.classList.remove('show-login');
    })
}

/*=============== ADD SHADOW HEADER ===============*/

const shadowHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('shadow-header') 
                       : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== CREATE NEWS-CARDS ===============*/

  class Card {
    constructor(id, title, category, img, content) {
       this.id = id;
       this.title = title;
       this.category = category;
       this.img = img;
       this.content = content;
    }
   
    render() {
       const cardHTML = `
       <a href="#" onclick="viewCard(${this.id})">
            <div class="card">
                <div class="card__category">${this.category}</div>
                <img src="${this.img}" alt="image" class="card-image">
                <div class="card__title">${this.title}</div>
                <p class="put_content">${this.content}</p>
            </div>
        </a>
        <style>
          a{
            text-decoration: none;
          }
          .card{
            background: white;
            width: 270px;
            margin: 10px;
            border-radius: 15px;
            color: rgb(4, 37, 66);
            position: relative;
          }
          .card .card__category{
            position: absolute;
            top: 8px;
            right: 8px;
            background: lightseagreen;
            color: white;
            padding: 2px 16px;
            font-size: 13px;
            text-transform: uppercase;
            border-radius: 8px;
          }
          .card-image{
            height: 150px;
            margin-bottom: 15px;
            background-size: cover;
            border-radius: 15px 15px 0 0;
            width: 100%;
          }
          .card .card__title{
            padding-left: 10px;
            padding-right: 10px;
            font-family: sans-serif;
            font-size: 20px;
          }
          .card p{
            padding-left: 10px;
            padding-right: 10px;
            line-height: 2rem;
            max-height: 8rem;
            -webkit-box-orient: vertical;
            display: block;
            display: -webkit-box;
            overflow: hidden!important;
            text-overflow: ellipsis;
            -webkit-line-clamp: 4;
          }
          .card:hover{
            background-color: rgb(62, 62, 62);
            color: white;
            cursor: pointer;
            transform: scale(1.03);
            transition: all .5s ease;
          }
        </style>
        `;
   
       const container = document.getElementById('cards__container');
       container.innerHTML += cardHTML;
    }

    viewNewsOfCard(){
      const cardHTML = `
       <div class="card__in">
            <img src="${this.img}" alt="" class="card__img">
            <div class='card__title'>${this.title}</div>
            <p class="card__text">${this.content}</p>
            
            <div class="comment__container" id="comment__container">
              <div class="form__group">
                <input type="text" class="form__input" id="input-comment" placeholder="Your comment"/>
                <label for="name" class="form__label">Your comment</label>
              </div>            
              <button class="button" id="submit-button" onclick="write_comment()">Отправить</button>
              <ul class="comments" id="comments-list"></ul> 
              <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">         
            </div>        
       </div>
       <style>
      .card__title {
        font-size: 2rem;
        font-weight: 700;
        color: black;
        margin-top: 3rem;
      }
      
      .card__text {
        font-size: 1rem;
        font-weight: 300;
        flex-wrap: wrap;
        color: black;
        margin-top: 2rem;
        margin-left: 20%;
        width: 60%;
        text-align: start;
      }
      
      .card__img {
        width: 40%;        
        display: block;
        margin: 0 auto;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        flex-wrap: wrap;        
      }
      
      .card__in {
        text-align: center;
        align-items: center;
      }

      .comments {
        color: black;
        flex-wrap: wrap;
        margin-top: 1.5rem;
      }

      .comments li{
        margin-top: 1rem;
      }

      .form__label {
        font-family: 'Roboto', sans-serif;
        font-size: 1.2rem;
        text-align: center;
        margin-top: 0.7rem;
        display: block;
        transition: all 0.3s;
        transform: translateY(0rem);
        color: black;
      }
      
      .form__input {
        font-family: 'Roboto', sans-serif;
        color: #333;
        font-size: 1.2rem;
        margin: 0 auto;
        margin-top: 3rem;
        padding: 1.5rem 2rem;
        border-radius: 0.2rem;
        background-color: rgb(255, 255, 255);
        border: none;
        width: 20%;
        display: block;
        border-bottom: 0.3rem solid transparent;
        transition: all 0.3s;
      }
      
      .form__input:placeholder-shown + .form__label {
        opacity: 0;
        visibility: hidden;
        -webkit-transform: translateY(-4rem);
        transform: translateY(-4rem);
      }       
       </style>
       `;
  
      const container = document.getElementById('cards__container');
      container.innerHTML += cardHTML;      
    }
   }
   
   const data = [
    {
       id: 1,
       title: 'Man City win Club World Cup',
       category: 'football',
       img: 'https://editorial.uefa.com//resources/0288-19c1f3768972-191208e0dba4-1000/format/wide1/fbl-fifa-wclub-fluminense-man_city.jpeg?imwidth=988',
       content: "UEFA Champions League winners Manchester City have won the FIFA Club World Cup for the first time, beating Brazilian side Fluminense 4-0 in Friday's final. </br> Julián Álvarez struck inside the opening 60 seconds in Saudi Arabia, and City were 2-0 up when Mota Filho put through his own net on 27 minutes. Phil Foden added another before Álvarez sealed it for Pep Guardiola's men. </br> City, who saw off Urawa Red Diamonds 3-0 in the semi-finals, are the fourth English team to lift the Club World Cup since it launched in 2000. They follow Man United, Liverpool and Chelsea."
    },
    {
       id: 2,
       title: '"Милан" одержал волевую победу над "ПСЖ" в матче 4-го тура группового этапа ЛЧ',
       category: 'football',
       img: 'https://editorial.uefa.com/resources/0286-194d50abee49-a416e6e4bf7a-1000/format/wide1/fbl-eur-c1-psg-ac_milan.jpeg?imwidth=2048',
       content: 'Итальянский "Милан" одержал победу над французским "ПСЖ" (2:1) в домашнем матче четвертого тура группового этапа Лиги чемпионов УЕФА.</br> Таким образом, "Милан" набрал пять очков и поднялся на третье место в группе F. "ПСЖ", оставшись с шестью очками, опустился на второе место.'
    },
    {
       id: 3,
       title: 'Дубль Холанда помог «Манчестер Сити» разгромить «Янг Бойз»',
       category: 'football',
       img: 'https://e0.365dm.com/23/10/2048x1152/skysports-erling-haaland-man-city_6335701.jpg?20231025214032',
       content: 'Манчестер Сити» обыграл «Янг Бойз» (3:0) в матче группового этапа Лиги чемпионов.</br> На 23-й минуте первый гол в игре с пенальти забил нападающий «Манчестер Сити» Эрлинг Холанд. В дополнительное к первому тайму время полузащитник Фил Фоден удвоил преимущество «горожан». На 51-й минуте Холанд оформил дубль. На 53-й минуте красную карточку получил полузащитник «Янг Бойз» Сандро Лаупер.</br> «Манчестер Сити» идёт на 1-м месте в группе G (12 очков), «Янг Бойз» занимает 4-е место (1 очко).</br>',
    },
    {
       id: 4,
       title: 'NBA joins celebration of first-ever World Basketball Day',
       category: 'basketball',
       img: 'https://cdn.basketballnews.com/fit-in/800x0/filters:strip_exif():filters:quality(95)/images/story/11820/basketball_690w.jpg',
       content: 'The NBA today announced its celebrations of the first-ever World Basketball Day. </br> Established by the United Nations on August 23 during the FIBA World Cup, World Basketball Day will be observed annually on Dec. 21 – the day Dr. James Naismith first introduced the game of basketball at the Springfield YMCA in 1891. </br> “The NBA family is thrilled to join the global basketball community in celebrating the first World Basketball Day,” said NBA Commissioner Adam Silver. “More than 130 years after Dr. James Naismith invented the game at the Springfield YMCA, World Basketball Day is a reminder of basketball’s ability to transcend borders, cultures and languages and unite people around the world.” </br> Nearly 600 million people across the globe play basketball annually and basketball is the second-most popular sport in the world, while the number one team sport to play in the United States. </br> Alongside the National Basketball Players Association (NBPA), the National Collegiate Athletic Association (NCAA), USA Basketball and the International Basketball Federation (FIBA), the NBA family will honor the game and celebrate World Basketball Day through various programming such as youth clinics and respective social media campaigns – all demonstrating basketball’s societal contributions.',
    },
    {
       id: 5,
        title: 'Red Bull RB20 will be “evolution over revolution” as it predicts F1 rival clones',
        category: 'f1',
        img: 'https://cdn-9.motorsport.com/images/amp/YN1aWGb2/s1000/formula-1-qatar-gp-2023-max-ve-2.webp',
        content: "The Milton Keynes-based team has been hard at work on its RB20 for several months now, having elected to switch off development of its 2023 challenger early because it was so far ahead of the opposition. </br> But while it knows that it will need to make progress if it is to stay ahead of its competitors next year, the squad says that there will be no huge change of direction this winter – even if it is working on improvements. </br> Asked about what can be expected from the RB20, Red Bull team principal Christian Horner said: “Evolution not revolution. </br> “All areas have been revisited in the car, and we can't afford to have any complacency. </br> “So the car is very much an evolution of a theme. We're not reinventing the wheel, and that has been very much the route of the engineering path over the last 12 months.” </br> Although the RB19 won 21 out of 22 grands prix this year, Horner says his team is in no doubt that things are going to get tougher from here on. </br> He says that Red Bull is already seeing diminishing returns to the gains it is finding with the car, as he predicts the opposition to make significant progress as they copy the core design concepts that his squad has put to good use."
    },
    {
       id: 6,
       title: '«Милан» — ПСЖ 2-1 (Лига чемпионов, групповой этап, 4 тур)',
       category: 'football',
       img: 'https://editorial.uefa.com//resources/0287-196787deea97-d3b3890b3efd-1000/format/wide1/ac_milan_v_paris_saint-germain_group_f_-_uefa_champions_league_2023_24.jpeg?imwidth=988',
       content: 'Голы:</br>0:1 – 9 Шкриньяр,</br> 1:1 – 12 Рафаэл Леао,</br> 2:1 – 50 Жиру.</br> Состав «Милана»: Меньян, Калабрия, Томори, Тшау, Эрнандес, Лофтус-Чик, Пулишич (Флоренци, 90), Рейндерс, Муса (Крунич, 84), Рафаэл Леао (Окафор, 85), Жиру.</br> Состав ПСЖ: Доннарумма, Хакими, Маркиньос, Шкриньяр (Барколя, 89), Эрнандес (Мукиеле, 65), Угарте (Фабиан Руис, 60), Витинья (Ли Кан Ин, 60), Заир-Эмери, Дембеле, Мбаппе, Коло-Муани (Гонсалу Рамуш, 60).</br> Предупреждения: Витинья (24), Коло-Муани (29), Угарте (43), Эрнандес (55), Муса (66), Шкриньяр (80).'
    },
    {
       id: 7,
       title: 'Heck of a Morning: Reaction to Dana White’s UFC 300 fight announcements',
       category: 'ufc',
       img: 'https://cdn.vox-cdn.com/thumbor/gbnhMraq_RAWPiTnkVNhw4xd98o=/0x0:7829x5219/920x613/filters:focal(3188x1214:4440x2466):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/72991088/1858434359.0.jpg',
       content: 'UFC CEO Dana White dropped a slew of fight announcements on Thursday, including the first bouts for the historic UFC 300 event in April. While White didn’t drop the main event, he did drop some interesting bouts such as Aljamain Sterling vs. Calvin Kattar, Jiri Prochazka vs. Aleksandar Rakic, and the return of Bo Nickal. Do those fights make you feel as if the PPV lineup will be the most stacked card we’ve had in a few years? </br> On an all-new edition of Heck of a Morning, MMA Fighting’s Mike Heck reacts to the UFC 300 bouts, along with White announcing Robert Whittaker vs. Paulo Costa, and the moving up of Ian Machado Garry vs. Geoff Neal, Yair Rodriguez vs. Brian Ortega 2 for Mexico City, and Erin Blanchfield vs. Manon Fiorot for UFC Atlantic City in March. Additionally, listener questions include Alex Pereira potentially teasing a move up to heavyweight to try and win a third UFC divisional title, Alexa Grasso and Zhang Weili’s respectful back and forth, Parker Porter’s UFC release, and much more. </br> You can listen live to Heck of a Morning Tuesdays, Thursdays, and Fridays at 10 a.m. ET on the MMA Fighting Twitter Spaces.'
    },
    {
       id: 8,
        title: 'Williams and Sauber reveal 2024 F1 launch plans',
        category: 'f1',
        img: 'https://cdn-5.motorsport.com/images/amp/Y99eKbqY/s1000/formula-1-las-vegas-gp-2023-al-2.webp',
        content: 'Within minutes of each other, Williams and Sauber revealed that they will launch their respective 2024 seasons at ceremonies to be held on Monday 5 February. </br> While Sauber has committed to showcasing the C44 in a ceremony in London, Williams has made no such promise and last year used the launch to showcase its new livery, and not the car itself. </br> Both teams shared ‘save the date’ cards on social media in a flurry of activity on Friday evening, giving fans an early Christmas present ahead of the festive season. </br> The pair follow Ferrari in sharing their plans, with team principal Fred Vasseur stating a 13 February launch for the 2024 car, codenamed 676. </br> Last year, Williams was the second team to launch, following on from Haas – the American team more often than not opening launch season. Williams was followed one day later by Alfa Romeo – now Sauber. </br> This is the first time that Sauber will have revealed its car in the UK, with previous unveilings taking place in Switzerland, Austria and Germany.'
    }, 
    {
      id: 9,
      title: "Dennis Smith Jr. and Kris Dunn are NBA's paragons of persistence",
      category: 'basketball',
      img: 'https://cdn.basketballnews.com/fit-in/800x0/filters:strip_exif():filters:quality(95)/images/story/11806/dunn_690w.jpg',
      content: 'For some NBA players, things don’t click right away. But a rookie struggling is no reason to fret; most rookies in the NBA are, to put it bluntly, kind of bad. Adjusting to the size, speed and strength of NBA veterans is a tall task, but franchises understand that and will usually show patience regarding rookies. </br> Sometimes things don’t click in year two either. Of course, teams want to see improvement in a player’s counting statistics and feel for the game, but growing pains are expected for sophomores too. If things haven’t clicked by year three though, alarms start to go off. When a player still looks lost on the floor – or is already on his second or third team – his future prospects start to look a little bleak. </br> That’s why the stories of Dennis Smith Jr. and Kris Dunn are massively impressive. Both are former top-10 picks who lasted less than two years with the teams that drafted them (the New York Knicks and Minnesota Timberwolves, respectively). They have each been waived, overlooked and altogether neglected. But now, Smith and Dunn have found homes with teams that expect legitimate production from them this season – and maybe beyond. </br> Smith signed a one-year, $2.5-million deal with the Brooklyn Nets this summer and he will serve as the team’s backup point guard, leading a second unit that will also include Dorian Finney-Smith and Royce O’Neale – and has some serious potential for excitement on the defensive end. Dunn, meanwhile, just had his 2023-24 contract guaranteed by the Jazz and will almost certainly get regular minutes in Utah’s backcourt.'
   },
   {
      id: 10,
       title: 'Yair Rodriguez vs Brian Ortega 2 set for UFC’s return to Mexico City in February',
       category: 'ufc',
       img: 'https://cdn.vox-cdn.com/thumbor/UNEXzISj5MyI7uS_7qZLKqSg7Fk=/0x0:4578x3276/920x613/filters:focal(1772x211:2504x943):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/72989207/1409175886.0.jpg',
       content: 'Yair Rodriguez and Brian Ortega run it back when the UFC returns to Mexico City on Feb. 24. </br> UFC CEO Dana White took to Instagram to announce the two featherweights will throw down once again in a five-round co-main event inside Arena CDMX. </br> Rodriguez and Ortega initially met in the main event of UFC Long Island in July 2022. Unfortunately, Ortega suffered a shoulder injury just over four minutes into the contest, giving Rodriguez the TKO win. </br> This marks Ortega’s return to action after recovering from his injury. </br> Rodriguez, on the other hand, followed up his win by claiming the interim featherweight title against Josh Emmett in the co-main event of UFC 284 in February. He failed in his bid to become undisputed champion while falling by knockout to division kingpin Alexander Volkanovski at UFC 290. </br> A flyweight title-eliminator between Brandon Moreno and Amir Albazi serves as the main event in Mexico City with more fights still to be announced.'
   }, 
   ];
   
   data.forEach(item => {
    const card = new Card(item.id, item.title, item.category, item.img, item.content);
    card.render();
   });

/*=============== SORT CATEGORY ===============*/

  // Отслеживание нажатий на ссылки категории
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Удаление всех карточек
        const container = document.getElementById('cards__container');
        container.innerHTML = '';

        // Рендеринг только карточек с выбранной категорией
        data.forEach(item => {
            if (item.category === link.dataset.category) {
                const card = new Card(item.id, item.title, item.category, item.img, item.content);
                card.render();
            }else if(link.dataset.category === 'home'){
                const card = new Card(item.id, item.title, item.category, item.img, item.content);
                card.render();            
            }
        });
    });
  });

/*=============== VIEW CARD ===============*/

function viewCard(id){
  const container = document.getElementById('cards__container');
  container.innerHTML = '';

  data.forEach(item => {
    if (id === item.id) {
        const card = new Card(item.id, item.title, item.category, item.img, item.content);
        card.viewNewsOfCard();
    }
  });
}

/*=============== VALIDATION LOGIN FORM ===============*/

function checkInput(id) {
  let input = document.getElementById(id);
  const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  switch (id) {
    case "login_name":
      if (input.value.trim() === "" || (/^[a-zA-Z0-9]+$/.test(input.value.trim()) === false)){
        username_field.style.border = "0.1px solid red";
        return false;
      }
      else{
        username_field.style.border = "none";
        return true;
      }
      break;
    case "login_email":
      if (input.value.trim() === "" || (emailPattern.test(input.value.trim()) === false)){
        email_field.style.border = "0.1px solid red";
        return false;
      }
      else{
        email_field.style.border = "none";
        return true;
      }
      break;
    case "login_pass":
      if (input.value.trim() === "" || input.value.length < 8){
        password_field.style.border = "0.1px solid red";
        return false;
      }
      else{
        password_field.style.border = "none";
        return true;
      } 
      break;
    default:
      return false;
  }
}

function checkForm(form) {
  let valid_1 = true, valid_2 = true, valid_3 = true;
  let valid = true;
  let message = '';

  if (form === 'sign_up') {
      valid_1 = checkInput("login_name");
      valid_2 = checkInput("login_email");
      valid_3 = checkInput("login_pass");
      valid = valid_1 && valid_2 && valid_3;
      if (!valid) {
          message = "Пожалуйста, заполните все поля правильно";
      }
  } else if (form === 'log_in') {
      valid_1 = checkInput("login_email");
      valid_2 = checkInput("login_pass");
      valid = valid_1 && valid_2;
      valid = checkInput("login_email") && checkInput("login_pass");
      if (!valid) {
          message = "Пожалуйста, заполните все поля правильно";
      }
  }

  if (!valid) {
      alert(message);
  }
  return valid;
}

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const registration_title = document.getElementById("registration_title");
const username_field = document.getElementById("username_field");
const email_field = document.getElementById("email_field");
const password_field = document.getElementById("password_field");
const login__option = document.getElementById("login__option");

const login_user = document.getElementById("login_user");

let count_click_log = true;
let count_click_sign = false;
let user_registration_or_login = false;

let logged_in_user_name = "";

signupBtn.addEventListener("click", function (event) {
  event.preventDefault();
  username_field.style.maxHeight = "60px";
  registration_title.innerHTML = "Sign Up";
  loginBtn.classList.add("signup__button");
  signupBtn.classList.remove("signup__button");
  login__option.innerHTML = "— Or Log In —";

  if (count_click_sign && checkForm('sign_up')){
    alert("Успешная регистрация");
    logged_in_user_name = document.getElementById("login_email").value.split("@")[0];
    loginContent.classList.remove('show-login');
    user_registration_or_login = true;
  }
  count_click_sign = true;
  count_click_log = false;
});

loginBtn.addEventListener("click", function (event) {
  event.preventDefault();
  username_field.style.maxHeight = "0";
  registration_title.innerHTML = "Log In";
  signupBtn.classList.add("signup__button");
  loginBtn.classList.remove("signup__button");
  login__option.innerHTML = "— Or Sign Up —";

  if (count_click_log && checkForm('log_in')){
    alert("Успешный вход");
    logged_in_user_name = document.getElementById("login_email").value.split("@")[0];
    loginContent.classList.remove('show-login');
    user_registration_or_login = true;
  }
  count_click_sign = false;
  count_click_log = true; 
});

/*=============== EXIT USER FROM WEBSITE ===============*/

login_user.addEventListener("click", function (event) {
  event.preventDefault();
  login_user.style.display = "none";
  loginButton.style.display = "flex";
  count_click_log = true;
  count_click_sign = false;
});

/*=============== SAVE DATA IN LOGIN FORM ===============*/

document.addEventListener('DOMContentLoaded', function(){
  let login_form_data = {};
  const login__form = document.getElementById("login__form");
  const LS = localStorage;
  
  // get data 
  login__form.addEventListener("input", function (event) {
    login_form_data[event.target.name] = event.target.value;
    LS.setItem('login_form_data', JSON.stringify(login_form_data));
  });
  
  // restore data
  if(LS.getItem('login_form_data')){
    login_form_data = JSON.parse(LS.getItem('login_form_data'));
    for (let key in login_form_data) {
      login__form.elements[key].value = login_form_data[key];
    }
  }
})

/*=============== CREATE COMMENTS ===============*/

let cardComments = [];

function write_comment(){
  if(user_registration_or_login){
    let comment = document.getElementById('input-comment').value;
    if (comment.trim() !== '') {
        document.getElementById('comments-list').innerHTML +=  `<li><b>${logged_in_user_name}</b> : ${comment}</li>` ;
        cardComments.push(comment);
        document.getElementById('input-comment').value = '';
    }
  } else{
    alert("You cannot enter comments until you register or log into your personal account");
  }	 
}