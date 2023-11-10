const main = document.querySelector(".profile-info");
const username = document.querySelector("#username");
const editProfileBtn = document.querySelector("#edit-profile");
const myArtBtn = document.querySelector("#my-art");
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
const myArtComponent = `<h2 id="my-art-header">My Art</h2>
          <div class="my-art">
            <div class="art-container">
              <h3>Purchased</h3>
              <div class="art-scroll-view">
                      <div class="art-carousel">
                        <a href="https://theartling.com/en/artwork/adrienn-krahl-time-travel-3/" class="card">
              <div class="image">
                <img src="../images/African-Landscape.jpg" alt="" />
              </div>
              <span class="title">The River's Witness</span>
              <span class="price">N 100,000</span>
                        </a>
                        <div class="card">
              <div class="image">
                <img src="../images/African-Landscape.jpg" alt="" />
              </div>
              <span class="title">The River's Witness</span>
              <span class="price">N 100,000</span>
                        </div>
                        <div class="card">
              <div class="image">
                <img src="../images/African-Landscape.jpg" alt="" />
              </div>
              <span class="title">The River's Witness</span>
              <span class="price">N 100,000</span>
                        </div>
                        <div class="card">
              <div class="image">
                <img src="../images/African-Landscape.jpg" alt="" />
              </div>
              <span class="title">The River's Witness</span>
              <span class="price">N 100,000</span>
                        </div>
                        <div class="card">
              <div class="image">
                <img src="../images/African-Landscape.jpg" alt="" />
              </div>
              <span class="title">The River's Witness</span>
              <span class="price">N 100,000</span>
                        </div>
                      </div>
                    </div>
            </div>
            <div class="art-container">
              <h3>Liked</h3>
              <div class="art-scroll-view">
                <div class="art-carousel">
                  <a href="https://theartling.com/en/artwork/adrienn-krahl-time-travel-3/" class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </a>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="art-container">
              <h3>Recently Viewed</h3>
              <div class="art-scroll-view">
                
                <div class="art-carousel">
                  <a href="https://theartling.com/en/artwork/adrienn-krahl-time-travel-3/" class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </a>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
const deleteAccountComponent = `<h2>Delete My Account</h2>
        <div class="delete-container">
          <p>Are you sure you want to leave</p>
          <div class="delete-btns">
            <button>TAKE ME BACK</button><button>I WANT TO LEAVE</button>
          </div>
        </div>`;

// Event listeners
editProfileBtn.addEventListener("click", () => updateView(profileComponent));
myArtBtn.addEventListener("click", () => updateView(myArtComponent));
logoutBtn.addEventListener("click", logout);
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
  console.log("Cleared");
  localStorage.clear();
  window.open("../index.html", "_self");
}
