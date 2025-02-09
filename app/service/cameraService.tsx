const ip: string = "172.16.96.45";

const savePicture = async (
  height: number,
  width: number,
  encodeData: string | undefined
) => {
  const response = await fetch("http://" + ip + ":5000/save", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ height: height, width: width, data: encodeData }),
  });

  if (response.status == 409) {
    return null;
  }

  return response.json();
};

const fetchPics = async () => {};
