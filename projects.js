const allCards = document.getElementById("card-container");

function createProjectCard(projectData) {
  const projectCard = document.createElement("div");
  projectCard.classList.add("project-card");

  const projectName = document.createElement("div");
  projectName.classList.add("project-name");
  projectName.innerHTML = `
      <p>
        <strong>Project: </strong>${projectData.name}
      </p>
    `;

  const projectRepo = document.createElement("div");
  projectRepo.classList.add("project-repo");
  projectRepo.innerHTML = `
      <strong>Github Repo: </strong>
      <a
        class="repo-link"
        rel="noopener"
        href="${projectData.link}"
        target="_blank"
        >${projectData.link}</a
      >
    `;

  const projectDescription = document.createElement("div");
  projectDescription.classList.add("project-description");
  projectDescription.innerHTML = `
      <strong>Project Description: </strong>
      <p>${projectData.description}</p>
    `;

  projectCard.append(projectName, projectRepo, projectDescription);
  return projectCard;
}

function fetchRepos() {
  allCards.replaceChildren();

  fetch("https://api.github.com/users/sithid/repos")
    .then((response) => response.json())
    .then((data) => {
      // 'data' will be an array of your public repositories
      console.log(data);

      const projectsList = document.getElementById("projects-list"); // Assuming you have a div with this ID
      data.forEach((repo) => {
        const data = {
          name: repo.name || "Repo name is missing.",
          link: repo.html_url || "Repo link is missing.",
          description: repo.description || "No description provided.",
        };

        const card = createProjectCard(data);
        allCards.append(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching repositories:", error);
    });
}

fetchRepos();
