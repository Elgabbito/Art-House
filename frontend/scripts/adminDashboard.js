const main = document.querySelector(".profile-info");
const username = document.querySelector("#username");
const editProfileBtn = document.querySelector("#edit-profile");
const myArtBtn = document.querySelector("#my-art");
const statsBtn = document.querySelector("#stats");
const logoutBtn = document.querySelector("#logout-btn");
const deleteAccountBtn = document.querySelector("#delete-account");

// Components
const profileComponent = ` <h2>Edit Profile</h2>

        <div class="profile-data">
          <form method="post" class="sign-form">
            <div class="form-control">
              <label>Update Username: </label>
              <input type="text" id="name-input" placeholder="Marnin Audu" />
            </div>
            <div class="form-control">
              <label>Update Email: </label>
              <input
                type="text"
                id="email-input"
                autocomplete="email"
                placeholder="user@gmail.com"
                required
              />
            </div>
            <div class="form-control" id="signup-psw">
              <label for="password">Update Password: </label>
              <input
                type="password"
                name="password"
                id="password-input"
                autocomplete="new-password"
                placeholder="********"
                required
              />
            </div>
            <div class="submit-btn">
              <a onclick="handleDataUpdate()"> Save </a>
            </div>
          </form>`;
const createAdminComponent = ` <h2>Create Admin</h2>

        <div class="profile-data">
          <form method="post" class="sign-form">
            <div class="form-control">
              <label>Username: </label>
              <input type="text" id="name-input" placeholder="Admin Audu" />
            </div>
            <div class="form-control">
              <label>Email: </label>
              <input
                type="text"
                id="email-input"
                autocomplete="email"
                placeholder="admin@gmail.com"
                required
              />
            </div>
            <div class="form-control" id="signup-psw">
              <label for="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password-input"
                autocomplete="new-password"
                placeholder="********"
                required
              />
            </div>
            <div class="submit-btn">
              <a onclick="handleDataUpdate()"> Save </a>
            </div>
          </form>`;
const StatisticsComponent = `<h2 id="my-art-header">User Analytics</h2>
          <div class="my-art">
            <div id="chart_div"></div>
        </div>
        <script>
      // load current chart package
      google.charts.load('current', {
        packages: ['corechart', 'line'],
      });

      // set callback function when api loaded
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        // create data object with default value
        let data = google.visualization.arrayToDataTable([
          ['Time', 'CPU Usage', 'RAM'],
          [0, 0, 0],
        ]);

        // create options object with titles, colors, etc.
        let options = {
          title: 'CPU Usage',
          hAxis: {
            textPosition: 'none',
          },
          vAxis: {
            title: 'Usage',
          },
        };

        // draw chart on load
        let chart = new google.visualization.LineChart(
          document.getElementById('chart_div')
        );
        chart.draw(data, options);

        // max amount of data rows that should be displayed
        let maxDatas = 50;

        // interval for adding new data every 250ms
        let index = 0;
        setInterval(function () {
          // instead of this random, you can make an ajax call for the current cpu usage or what ever data you want to display
          let randomCPU = Math.random() * 20;
          let randomRAM = Math.random() * 50 + 20;

          if (data.getNumberOfRows() > maxDatas) {
            data.removeRows(0, data.getNumberOfRows() - maxDatas);
          }

          data.addRow([index, randomCPU, randomRAM]);
          chart.draw(data, options);

          index++;
        }, 100);
      }
    </script>
        `;
const deleteAccountComponent = `<h2>Delete My Account</h2>
        <div class="delete-container">
          <p>Are you sure you want to leave</p>
          <div class="delete-btns">
            <button>TAKE ME BACK</button><button>I WANT TO LEAVE</button>
          </div>
        </div>`;

// Event listeners
editProfileBtn.addEventListener("click", () => updateView(profileComponent));
myArtBtn.addEventListener("click", () => updateView(createAdminComponent));
statsBtn.addEventListener("click", () => {
  updateView(StatisticsComponent);
});
logoutBtn.addEventListener("click", () => {
  logout();
});
window.addEventListener("load", () => {
  username.innerText = `Hi, ${localStorage.getItem("username")}`;
});
deleteAccountBtn.addEventListener("click", () =>
  updateView(deleteAccountComponent)
);
// Function Declararions
function updateView(component) {
  main.innerHTML = "";
  main.innerHTML = component;
}
function logout() {
  localStorage.clear();
  window.open("../index.html", "_self");
}
