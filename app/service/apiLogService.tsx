import { router } from "expo-router";

const ip: string = "192.168.0.188";
const registerUser = async (
  email: string,
  username: string,
  password: string
): Promise<String | null> => {
  const response = await fetch("http://" + ip + ":5000/auth/register", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    //{ "Content-Type": "application/json" },
    body: JSON.stringify({ fullname: username, email: email, pswd: password }),
  });
  console.log(await response.json());
  if (response.status == 201) {
    router.navigate("authUser/login");
    return response.status.toString();
  }

  if (response.status == 409) {
    return response.status.toString();
  }
  if (response.status == 400) {
    return response.status.toString();
  }

  return response.status.toString();
};

const loginUser = async (email: string, password: string) => {
  const response = await fetch("192.168.0.135:5000/auth/login", {
    method: "POST",
  });
};

export const apiLogService = { registerUser, loginUser };
