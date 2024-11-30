function handleClick() {
  fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=1601530`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error("Error:", err));
}

document.getElementById("btn").addEventListener("click", handleClick);
