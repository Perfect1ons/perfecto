import ky from "ky";

const maxkg = ky.create({
  prefixUrl: process.env.MAXKG,
  cache: "no-cache",
});
