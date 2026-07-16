"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BUILD_VERSION = "1.0.9";
const featureImage =
  "https://images.squarespace-cdn.com/content/v1/654e78f5a48aae5e62c92022/b5893395-d3b1-4406-ba6d-26162786312e/Gate%2Bof%2BTrust%2BPodcast%2BCovers.png";
const bookImage =
  "https://m.media-amazon.com/images/I/51ZnmX617uL._SX342_SY445_ML2