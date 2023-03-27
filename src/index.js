import "./styles.css";
import Alpine from "alpinejs";

Alpine.start();

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

console.log("toto");
Alpine.store("pullRequests", {
  pulls: [],

  set(pulls) {
    console.log(pulls);
    this.pulls = pulls;
  }
});
console.log("titi");

var apikey = "";

document.getElementById("apikey-form").addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  // console.log(e);
  // console.log(e.target.key.value);
  apikey = e.target.key.value;
  e.target.key.value = "";
});

async function getPullRequests(apikey) {
  const encoded = btoa("Amli:" + apikey);
  const response = await fetch(
    "https://api.github.com/repos/opendatasoft/platform/pulls?sort=updated&direction=desc&state=open",
    {
      headers: {
        Authorization: "Basic " + encoded
      }
    }
  );
  const result = await response.json();
  console.log(result);
  Alpine.store("pullRequests").set(result);
}

document.getElementById("fetch-button").addEventListener("click", () => {
  getPullRequests(apikey);
});
