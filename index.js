window.addEventListener("DOMContentLoaded", () => {
  try {
    (async function () {
      const body = document.querySelector("body");
      const add = document.querySelector(".add");
      const inp = document.querySelector(".inp");
      const delbtn = document.querySelector(".del");
      const form = document.querySelector(".form");
      let res = await fetch("https://jsonplaceholder.typicode.com/todos");
      let data = await res.json();

      const ul = document.createElement("ul");
      ul.className = "ul";

      const list = document.querySelector(".list");
      console.log(data);

      for (let i in data) {
        console.log(data[i]);
        //список
        const li = document.createElement("li");
        li.className = "li";
        li.textContent = `user: ${data[i].userId} task: ${data[i].title}`;
        li.style.color = "white";
        ul.append(li);
        list.append(ul);
        //кнопка удаления
        const rem = document.createElement("button");
        rem.classList.add("rem");
        rem.textContent = "x";
        li.append(rem);
        //чекбокс
        const check = document.createElement("input");
        check.className = "check";
        check.type = "checkbox";
        check.checked = data[i].completed;
        li.prepend(check);

        //кнопка удаления
        rem.addEventListener("click", (e) => {
          fetch(
            `https://jsonplaceholder.typicode.com/todos/${data[i].userId}`,
            {
              method: "DELETE",
            }
          )
            .then(() => {
              e.target.parentElement.remove();
              console.log("Пользователь удален");
            })
            .catch((err) => console.log(err));
        });

        //галочка выполнения
        check.addEventListener("click", (e) => {
          fetch(
            `https://jsonplaceholder.typicode.com/todos/${data[i].userId}`,
            {
              method: "PATCH",
              body: JSON.stringify({
                completed: !data[i].completed,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          )
            .then((res) => res.json()).then((data) => console.log(data))
            .catch((err) => console.log(err));
        });
      }

      //функция выполнения
      let addTodo = (text) => {
        fetch(`https://jsonplaceholder.typicode.com/todos`, {
          method: "POST",
          body: JSON.stringify({
            userId: 11,
            title: text,
            completed: false,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
      };

      //добавление таски
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (inp.value) {
          addTodo(inp.value);
        }
        inp.value = "";
      });

      delbtn.addEventListener("click", (e) => {
        inp.value = "";
      });
    })();
  } catch (error) {
    console.log(error);
  }
});
