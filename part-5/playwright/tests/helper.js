const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();

  const response = await page.waitForResponse((response) =>
    response.url().includes("/api/login")
  );
  const responseBody = await response.json();
  return responseBody.token;
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new note" }).click();
  await page.getByPlaceholder("write title here").fill(title);
  await page.getByPlaceholder("write author here").fill(author);
  await page.getByPlaceholder("write url here").fill(url);

  await page.getByRole("button", { name: "create" }).click();
};

const createUser = async (request, name, username, password) => {
  await request.post("api/users", {
    data: {
      name,
      username,
      password,
    },
  });
};

const checkSorted = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return true;
    }
  }
  return false;
};

const blogs = [
  {
    title: "Adventures in AI",
    author: "Tech Guru",
    url: "http://example.com/adventures-in-ai",
    likes: 2,
  },
  {
    title: "Exploring the Quantum Realm",
    author: "Dr. Quantum",
    url: "http://example.com/exploring-quantum-realm",
    likes: 5,
  },
  {
    title: "The Wonders of Space Travel",
    author: "Cosmic Voyager",
    url: "http://example.com/wonders-of-space-travel",
    likes: 8,
  },
  {
    title: "Gastronomy Galore",
    author: "Chef Extraordinaire",
    url: "http://example.com/gastronomy-galore",
    likes: 1,
  },
  {
    title: "Art in the Digital Age",
    author: "Pixel Painter",
    url: "http://example.com/art-digital-age",
    likes: 3,
  },
];

module.exports = { loginWith, createBlog, createUser, checkSorted, blogs };
