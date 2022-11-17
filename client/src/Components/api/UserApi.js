import axios from "axios";
import auth from "./auth";
const token = auth.getToken();
const host = "http://localhost:4000";
const urls = {
  login: `${host}/api/login`,
  register: `${host}/api/register`,
  users: `${host}/api/users`,
  messages: `${host}/api/chat/messages`,
  updateProfile: `${host}/api/settings/updateProfile`,
  changePassword: `${host}/api/settings/changePassword`,
};
export const getUsers = async () => {
  const data = await axios.get(urls.users, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const login = async (data, setAlert, bg) => {
  await axios
    .post(urls.login, data)
    .then((response) => {
      if (response) {
        const userdata = response.data.token;
        auth.setToken(userdata);
        localStorage.setItem("bg", bg);
        window.location.href = "/";
      }
    })
    .catch((err) => {
      setAlert({ status: "error", message: err.response.data.message });
    });
};

export const register = async (data, setAlert, bg) => {
  const formData = new FormData();
  formData.append("userPhoto", data.profile_image);
  formData.append("username", data.username);
  formData.append("password", data.password);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  axios
    .post(urls.register, formData, config)
    .then((response) => {
      const userdata = response.data.token;
      auth.setToken(userdata);
      localStorage.setItem("bg", bg);
      setAlert({ status: "success", message: response.data.message });

      setTimeout(() => (window.location.href = "/"), 1000);
    })
    .catch((err) => {
      setAlert({ status: "error", message: err.response.data.message });
    });
};
export const getMessages = async (sender, receiver) => {
  const data = await axios.get(urls.messages, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    params: {
      sender,
      receiver,
    },
  });

  return data.data;
};

export const updateProfile = (data, setAlert) => {
  const formData = new FormData();
  formData.append("userPhoto", data.profile_image);
  formData.append("username", data.username);
  formData.append("_id", data._id);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,

      "content-type": "multipart/form-data",
    },
  };
  axios
    .put(urls.updateProfile, formData, config)
    .then((response) => {
      console.log(response);
      auth.setToken(response.data.token);
      setAlert({ status: "success", message: response.data.message });
      setTimeout(() => window.location.reload(), 1000);
    })
    .catch((err) => {
      setAlert({ status: "error", message: err.response.data.message });
    });
};
export const updatePassword = (data, setAlert) => {
  console.log(data);
  axios
    .put(urls.changePassword, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      setAlert({ status: "success", message: response.data.message });
      setTimeout(() => window.location.reload(), 1000);
    })
    .catch((err) => {
      setAlert({ status: "error", message: err.response.data.message });
    });
};
