document.addEventListener('DOMContentLoaded', function () {


  const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';
  const array = JSON.parse(content);
  //Create array of all date entries from json file
  const dates = [];
  let d = 0;
  for (p of array) {
    if (!dates.includes(p.likelyDate))
      dates[d] = p.likelyDate;
    d++;
  }
  //sort dates from oldest to newest
  dates.sort();
  //Create array of all title names from json file
  const names = [];
  let n = 0;
  for (p of array) {
    if (!names.includes(p.title))
      names[n] = p.title;
    n++;
  }
  //sort names alphabetically
  names.sort();
  
  const list_of_plays = document.querySelector("#playList ul");
  
  list_of_plays.innerHTML = "";

  //print out list in order of entry in plays.json
  for (let i of array) {
    const li_item = document.createElement("li");
    li_item.setAttribute("id", "data-id");
    li_item.textContent = i.title;
    list_of_plays.appendChild(li_item);
  }

  let list_date = document.querySelector("#playList");

  list_date.addEventListener("click", function (e) {

    document.querySelector("#playList");
    //playList label = date
    if (e.target.nextSibling.nextSibling.innerHTML == "Date") {
     
      list_of_plays.innerHTML = "";
     

      for (let c of dates) {
        for (let a of array) {
          if (c == a.likelyDate) {
            //append date array
            const li_item_date = document.createElement("li");
            li_item_date.setAttribute("id", "data-id");
            li_item_date.textContent = a.title;
            list_of_plays.appendChild(li_item_date);
          }
        }
      }

    }
    //playList label = name
    if (e.target.nextSibling.nextSibling.innerHTML == "Name") {
     
      list_of_plays.innerHTML = "";

      for (let c of names) {
        for (let a of array) {
          if (c == a.title) {
            //append name array
            const li_item_date = document.createElement("li");
            li_item_date.setAttribute("id", "data-id");
            li_item_date.textContent = a.title;
            list_of_plays.appendChild(li_item_date);
          }
        }
      }
    }

  });

  //hide middle column till entry clicked on
  const aside_select = document.querySelector("aside");
  aside_select.style.display = "none";

  const playHere_select = document.querySelector("#playHere");
  playHere_select.innerHTML = ""; 

  //title is clicked, show middle column
  let clicktitle = document.querySelector("#playList ul");

  clicktitle.addEventListener("click", function (e) {
    //show section
    aside_select.style.display = "flex"; 

    const object = array.find(w => e.target.innerHTML == w.title); //OBJECT OF PLAY

    let playspecs_title = document.querySelector("#interface h2"); //display title
    playspecs_title.textContent = object.title;

    //hides the interactive scene act menu
    show_text("none");

    //synopsis information
    let synopsis_select = document.querySelector("fieldset #content");
    synopsis_select.textContent = object.synopsis;

    let synopsis_header_select = document.querySelector("fieldset #synopsis");
    synopsis_header_select.textContent = "Synopsis";

    //make right side visible but clear its html
    playHere_select.style.display = "block";
    playHere_select.innerHTML = "";

    //Set basic details of play using object as play reference
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
    //hide view button if no assigned api
    if (object.filename == "") {

      view_button.style.display = "none";
    }
    //show view play text button
    else
      view_button.style.display = "flex";


    view_button.addEventListener("click", function () {

      let playspecs_scene = document.querySelector("#sceneList");
      //Clear all menu presets
      playspecs_scene.innerHTML = "";
      //show interactive menu, hide view button
      close_button.style.display = "flex";
      view_button.style.display = "none";
      show_text("flex");
      //clear play details from previous window
      playHere_select.innerHTML = "";
      //clear synopsis
      synopsis_header_select.innerHTML = "";
      synopsis_select.innerHTML = "";

      let query_name = object.id;
      let query_url = `${api}?name=${query_name}`;
      //Fetch api information
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
          //base case is act 1 scene 1. Change upon click request
          const write_play = document.querySelector("#playHere");
          write_play.innerHTML = "";
          //adding title name
          const play_title = document.createElement("h2");
          play_title.textContent = data.title;
          write_play.appendChild(play_title);

          const act_Here = document.createElement("article");
          act_Here.setAttribute("id", "actHere");
          write_play.appendChild(act_Here);
          //adding act name
          const act_name = document.createElement("h3");
          act_name.textContent = data.acts[0].name;
          act_Here.appendChild(act_name);

          const scene_Here = document.createElement("div");
          scene_Here.setAttribute("id", "sceneHere");
          act_Here.appendChild(scene_Here);
          //adding scene name
          const scene_name = document.createElement("h4");
          scene_name.textContent = data.acts[0].scenes[0].name;
          scene_Here.appendChild(scene_name);

          //adding scene title
          const scene_title = document.createElement("p");
          scene_title.setAttribute("class", "title");
          scene_title.textContent = data.acts[0].scenes[0].title;
          scene_Here.appendChild(scene_title);

          const direction = document.createElement("p");
          direction.setAttribute("class", "direction");
          scene_Here.appendChild(direction);

          //Adding the speeches
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
          //Change the act information upon request. Also update possible scenes based on selected act
          playspecs_act.addEventListener("change", function () {
           
            //Find the string version of the current act
            var select = document.querySelector("#actList");
            var value = select.options[select.selectedIndex].value;
            
            //find the act's location that matches the current act
            const match = data.acts.find(f => f.name == value);
            
            //Clear scenelist and re-add the scenes based on selected act
            let playspecs_scene = document.querySelector("#sceneList");
            playspecs_scene.innerHTML = "";

            //Update scene names
            for (let i of match.scenes) {
              playspecs_scene_option = document.createElement("option");
              playspecs_scene_option.textContent = `${i.name}`;
              playspecs_scene.appendChild(playspecs_scene_option);
            }

            //Now update act number, act name, and play details based on
            //current selected act. Currently uses base case of scene 1 as scene 
            //event handler was not implemented
            const write_play = document.querySelector("#playHere");
            write_play.innerHTML = "";

            const play_title = document.createElement("h2");
            play_title.textContent = data.title;
            write_play.appendChild(play_title);

            const act_Here = document.createElement("article");
            act_Here.setAttribute("id", "actHere");
            write_play.appendChild(act_Here);
            //update act name 
            const act_name = document.createElement("h3");
            act_name.textContent = match.name;
            act_Here.appendChild(act_name);

            const scene_Here = document.createElement("div");
            scene_Here.setAttribute("id", "sceneHere");
            act_Here.appendChild(scene_Here);

            //update scene name
            const scene_name = document.createElement("h4");
            scene_name.textContent = match.scenes[0].name;
            scene_Here.appendChild(scene_name);
            //update scene title
            const scene_title = document.createElement("p");
            scene_title.setAttribute("class", "title");
            scene_title.textContent = match.scenes[0].title;
            scene_Here.appendChild(scene_title);

            const direction = document.createElement("p");
            direction.setAttribute("class", "direction");
            scene_Here.appendChild(direction);

            //update speeches with new act
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

          });

        });

    });

  });


  //Sets display property of all elements in fieldset id= interface
  function show_text(show) 
  {
//Used to show and hide the middle menu, hide if a play with api text entry is
//clicked on
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



