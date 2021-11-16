document.addEventListener('DOMContentLoaded', function () {


  const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';
  const array = JSON.parse(content);

  const dates = [];
  let d = 0;
  for (p of array) {
    if (!dates.includes(p.likelyDate))
      dates[d] = p.likelyDate;
    d++;
  }
  dates.sort();

  const names = [];
  let n = 0;
  for (p of array) {
    if (!names.includes(p.title))
      names[n] = p.title;
    n++;
  }
  names.sort();

  let list = document.querySelector("#playList ul");
  list.innerHTML = "";

  const list_of_plays = document.querySelector("#playList ul");

  for (let i of array) {
    const li_item = document.createElement("li");
    li_item.setAttribute("id", "data-id");
    li_item.textContent = i.title;
    list_of_plays.appendChild(li_item);
  }

  let list_date = document.querySelector("#playList");

  list_date.addEventListener("click", function (e) {

    document.querySelector("#playList");

    if (e.target.nextSibling.nextSibling.innerHTML == "Date") {
      let list = document.querySelector("#playList ul");
      list.innerHTML = "";
      const li_list_date = document.querySelector("#playList ul");

      for (let c of dates) {
        for (let a of array) {
          if (c == a.likelyDate) {

            const li_item_date = document.createElement("li");
            li_item_date.setAttribute("id", "data-id");
            li_item_date.textContent = a.title;
            li_list_date.appendChild(li_item_date);
          }
        }
      }

    }

    if (e.target.nextSibling.nextSibling.innerHTML == "Name") {
      let list = document.querySelector("#playList ul");
      list.innerHTML = "";

      const li_list_name = document.querySelector("#playList ul");

      for (let c of names) {
        for (let a of array) {
          if (c == a.title) {

            const li_item_date = document.createElement("li");
            li_item_date.setAttribute("id", "data-id");
            li_item_date.textContent = a.title;
            li_list_name.appendChild(li_item_date);
          }
        }
      }
    }

  });

  const aside_select = document.querySelector("aside");
  aside_select.style.display = "none";

  const playHere_select = document.querySelector("#playHere");
  playHere_select.innerHTML = ""; // recently changed from .style.display = "none"

  /////////////////////////DONE///////////////////////////////////////////////////

  let clicktitle = document.querySelector("#playList ul");

  clicktitle.addEventListener("click", function (e) {


    aside_select.style.display = "flex"; //

    const object = array.find(w => e.target.innerHTML == w.title); //OBJECT OF PLAY

    let playspecs_title = document.querySelector("#interface h2"); //display title
    playspecs_title.textContent = object.title;

    //hides the menu - activate 
    show_text("none");

    //synopsis information
    let synopsis_select = document.querySelector("fieldset #content");
    synopsis_select.textContent = object.synopsis;

    let synopsis_header_select = document.querySelector("fieldset #synopsis");
    synopsis_header_select.textContent = "Synopsis";

    // playHere_select.style.display = "flex";

    playHere_select.style.display = "block";
    //const playHere_select = document.querySelector("#playHere");
    playHere_select.innerHTML = "";

    const play_details = document.createElement("h2");

    play_details.textContent = `${object.title} details:`;
    playHere_select.appendChild(play_details);

    const play_date = document.createElement("p");
    play_date.textContent = `Likely date of composition: ${object.likelyDate}`;
    playHere_select.appendChild(play_date);

    const play_genre = document.createElement("p");
    play_genre.textContent = `Genre: ${object.genre}`;
    playHere_select.appendChild(play_genre);

    const play_wiki = document.createElement("a");
    play_wiki.setAttribute("href", object.wiki);
    play_wiki.textContent = `Wiki link`;
    playHere_select.appendChild(play_wiki);

    const linebreak = document.createElement("br");
    playHere_select.appendChild(linebreak);

    const play_gutenberg = document.createElement("a");
    play_gutenberg.setAttribute("href", object.gutenberg);
    play_gutenberg.textContent = `Gutenberg link`;
    playHere_select.appendChild(play_gutenberg);


    const play_desc = document.createElement("p");
    play_desc.textContent = `${object.desc}`;
    playHere_select.appendChild(play_desc);


    let view_button = document.querySelector("#btnView");
    view_button.style.display = "none";

    let close_button = document.querySelector("#btnClose");
    close_button.style.display = "none";

    if (object.filename == "") {

      view_button.style.display = "none";
    }
    else
      view_button.style.display = "flex";



    view_button.addEventListener("click", function () {

      let playspecs_scene = document.querySelector("#sceneList");
      playspecs_scene.innerHTML = "";
      close_button.style.display = "flex";
      view_button.style.display = "none";
      show_text("flex");
      playHere_select.innerHTML = "";

      synopsis_header_select.innerHTML = "";
      synopsis_select.innerHTML = "";

      let query_name = object.id;
      let query_url = `${api}?name=${query_name}`;

      fetch(query_url)

        .then(resp => resp.json())
        .then(data => {

          let playspecs_act = document.querySelector("#actList");
          playspecs_act.innerHTML = "";

       

          /*setup base cases for dropdowns*/
          for (let i of data.acts) {
            playspecs_act_option = document.createElement("option");
            playspecs_act_option.textContent = `${i.name}`;
            playspecs_act.appendChild(playspecs_act_option);
          }

          for (let i of data.acts[0].scenes) {

            playspecs_act_option = document.createElement("option");
            playspecs_act_option.textContent = `${i.name}`;
            playspecs_scene.appendChild(playspecs_act_option);
          }
          //just do this twice, additional time in event listener

          const write_play = document.querySelector("#playHere");
          write_play.innerHTML = "";

          const play_title = document.createElement("h2");
          play_title.textContent = data.title;
          write_play.appendChild(play_title);

          const act_Here = document.createElement("article");
          act_Here.setAttribute("id", "actHere");
          write_play.appendChild(act_Here);

          const act_name = document.createElement("h3");
          act_name.textContent = data.acts[0].name;
          act_Here.appendChild(act_name);

          const scene_Here = document.createElement("div");
          scene_Here.setAttribute("id", "sceneHere");
          act_Here.appendChild(scene_Here);

          const scene_name = document.createElement("h4");
          scene_name.textContent = data.acts[0].scenes[0].name;
          scene_Here.appendChild(scene_name);

          const scene_title = document.createElement("p");
          scene_title.setAttribute("class", "title");
          scene_title.textContent = data.acts[0].scenes[0].title;
          scene_Here.appendChild(scene_title);

          const direction = document.createElement("p");
          direction.setAttribute("class", "direction");
          scene_Here.appendChild(direction);


          for (i of data.acts[0].scenes[0].speeches) {
            const speech = document.createElement("div");
            speech.setAttribute("class", "speech");
            scene_Here.appendChild(speech);

            const span = document.createElement("span");
            span.textContent = i.speaker;
            speech.appendChild(span);

            for (f of i.lines) {
              const dialogue = document.createElement("p");
              dialogue.textContent = f;
              speech.appendChild(dialogue);
            }
          }

          playspecs_act.addEventListener("change", function () {
            var select = document.querySelector("#actList");
            var value = select.options[select.selectedIndex].value;
            
            var scene_select = document.querySelector("#sceneList");
            var scene_value = scene_select.options[scene_select.selectedIndex].value;

          
            const match = data.acts.find(f => f.name == value);
   

            const scene_match = match.scenes.find(e => e.name == scene_value);
            
            
            let playspecs_scene = document.querySelector("#sceneList");
            playspecs_scene.innerHTML = "";


            for (let i of match.scenes) {

              //console.log(i.name);
              playspecs_scene_option = document.createElement("option");
              playspecs_scene_option.textContent = `${i.name}`;
              playspecs_scene.appendChild(playspecs_scene_option);
            }


            const write_play = document.querySelector("#playHere");
            write_play.innerHTML = "";

            const play_title = document.createElement("h2");
            play_title.textContent = data.title;
            write_play.appendChild(play_title);

            const act_Here = document.createElement("article");
            act_Here.setAttribute("id", "actHere");
            write_play.appendChild(act_Here);

            const act_name = document.createElement("h3");
            act_name.textContent = match.name;
            act_Here.appendChild(act_name);

            const scene_Here = document.createElement("div");
            scene_Here.setAttribute("id", "sceneHere");
            act_Here.appendChild(scene_Here);

            const scene_name = document.createElement("h4");
            scene_name.textContent = match.scenes[0].name;
            scene_Here.appendChild(scene_name);

            const scene_title = document.createElement("p");
            scene_title.setAttribute("class", "title");
            scene_title.textContent = match.scenes[0].title;
            scene_Here.appendChild(scene_title);

            const direction = document.createElement("p");
            direction.setAttribute("class", "direction");
            scene_Here.appendChild(direction);


            for (i of match.scenes[0].speeches) {
              const speech = document.createElement("div");
              speech.setAttribute("class", "speech");
              scene_Here.appendChild(speech);

              const span = document.createElement("span");
              span.textContent = i.speaker;
              speech.appendChild(span);

              for (f of i.lines) {
                const dialogue = document.createElement("p");
                dialogue.textContent = f;
                speech.appendChild(dialogue);
              }
            }




            //console.log(playspecs_act.innerHTML); work on after. First need to show play content


          });







        });

    });

    // const play_date = 
    // const play_genre = 
    // const play_wiki = 
    // const play_gutenberg = 
    // const play_shakespeare = 
    // const description = 


  });

















  function show_text(show) //show = none or flex/inline
  {


    // const playHere_select = document.querySelector("#playHere");
    // playHere_select.style.display = "inline";  WHEN BUTTON IS PRESSED 

    const actList = document.querySelector("#actList");
    actList.style.display = `${show}`;

    const sceneList = document.querySelector("#sceneList");
    sceneList.style.display = `${show}`;

    const playerList = document.querySelector("#playerList");
    playerList.style.display = `${show}`;

    const txtHighlight = document.querySelector("#txtHighlight");
    txtHighlight.style.display = `${show}`;

    const btnHighlight = document.querySelector("#btnHighlight");
    btnHighlight.style.display = `${show}`;

    const fieldset = document.querySelector("fieldset");
    fieldset.style.border = `${show}`;

  }


});


/*
 To get a specific play, add play's id property (in plays.json) via query string,
   e.g., url = url + '?name=hamlet';

 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=macbeth

 NOTE: Only a few plays have text available. If the filename property of the play is empty,
 then there is no play text available.
*/



