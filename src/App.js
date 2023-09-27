import { faker } from "@faker-js/faker";
import { Virtuoso } from "react-virtuoso";
import { useCallback, useEffect, useState } from "react";
import "./App.css";

const generated = [];

function toggleBg(index) {
  return index % 2 ? "#f5f5f5" : "white";
}

const Footer = () => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      Loading ...
    </div>
  );
};

const getUser = (index) => {
  if (!generated[index]) {
    generated[index] = user(index);
  }

  return generated[index];
};

function generateUsers(length, startIndex = 0) {
  return Array.from({ length }).map((_, i) => getUser(i + startIndex));
}

function user(index = 0) {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();

  return {
    index: index + 1,
    bgColor: toggleBg(index),
    name: `${firstName} ${lastName}`,
    initials: `${firstName.substr(0, 1)}${lastName.substr(0, 1)}`,
    jobTitle: faker.name.jobTitle(),
    description: faker.lorem.sentence(10),
    longText: faker.lorem.paragraphs(1),
  };
}

function App() {
  const [users, setUsers] = useState(() => []);

  const loadMore = useCallback(() => {
    return setTimeout(() => {
      setUsers((users) => [...users, ...generateUsers(5, users.length)]);
    }, 2000);
  }, [setUsers]);

  useEffect(() => {
    const timeout = loadMore();
    return () => clearTimeout(timeout);
  }, [loadMore]);
  return (
    <>
      <div className="container">
        <div className="navbar">NAVBAR (STICKY)</div>
        <main className="sub-component">
          <div className="left">
            <p>
              Manage Your <br />
              Notifications
            </p>
            <p className="settingText">View Settings</p>
          </div>
          <div className="middle">
            {/* MIDDLE SECTION (SCROLLABLE) */}
            <div className="feedHeader">
              <button>All</button>
              <button>My Posts</button>
              <button>Mentions</button>
            </div>
            <div className="feedPost">
              <Virtuoso
                style={{ height: "100%" }}
                data={users}
                endReached={loadMore}
                overscan={200}
                itemContent={(index) => (
                  <div className="item">
                    {index} {users[index].name}
                  </div>
                )}
                useWindowScroll={true}
                components={{ Footer }}
              />
            </div>
          </div>
          <div className="right">
            <div>
              <a href="#" className="link">
                About
              </a>
              <a href="#" className="link">
                Accessiblity
              </a>
              <a href="#" className="link">
                Help Center
              </a>
              <br />
              <a href="#" className="link">
                Privacy & Terms
              </a>
              <a href="#" className="link">
                Ad Choices
              </a>
              <br />
              <a href="#" className="link">
                Advertising
              </a>
              <a href="#" className="link">
                Business Services
              </a>
              <br />
              <a href="#" className="link">
                Get The LinkedIn App
              </a>
              <a href="#" className="link">
                More
              </a>
              <br />
            </div>
            <div className="imageDiv">
              <img
                src="https://static.licdn.com/sc/h/47josflhxdz9o3v227aa72l1p"
                alt="linkedIn Image"
              />
              <p className="imageText">LinkedIn Corporation © 2023</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
