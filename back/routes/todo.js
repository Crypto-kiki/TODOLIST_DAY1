const express = require("express");

const router = express.Router();

let toDoData = require("../todoData.json");

// 전체 todo 조회
router.get("/", (req, res) => {
  console.log(toDoData);
  res.json(toDoData);
});

// 특정 todo 조회
router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) >= toDoData.length) {
    return res.status(400).json({ error: "존재하지 않는 ID입니다." });
  }
  console.log(toDoData);
  res.json(toDoData[parseInt(id)]);
});

// todo 수정
router.put("/id", (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  if (parseInt(id) >= toDoData.length) {
    return res.status(400).json({ error: "존재하지 않는 ID 입니다." });
  }

  if (!title && !desc) {
    return res
      .status(400)
      .json({ error: "타이틀이나 설명 중에 하나의 값을 입력하세요." });
  }

  toDoData[parseInt(id)] = {
    title: title ? title : toDoData[parseInt(id)].title,
    desc: desc ? desc : toDoData[parseInt(id)].desc,
    isDone: toDoData[parseInt(id)].isDone,
  };

  console.log(toDoData);
  res.json(toDoData);
});

// todo 완료 처리
router.put("/done/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) >= toDoData.length) {
    res.status(400).json({ error: "존재하지 않는 ID 입니다." });
    return;
  }

  toDoData[parseInt(id)] = {
    title: toDoData[parseInt(id)].title,
    desc: toDoData[parseInt(id)].desc,
    isDone: !toDoData[parseInt(id)].isDone,
  };

  console.log(toDoData);

  res.json(toDoData);
});

// todo 삭제
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) >= toDoData.length) {
    res.status(400).json({ error: "존재하지 않는 ID 입니다." });
    return;
  }

  toDoData = toDoData.filter((v, i) => {
    return parseInt(id) !== i;
  });

  console.log(toDoData);

  res.json(toDoData);
});

//todo 생성
router.post("/", (req, res) => {
  const { title, desc } = req.body;

  if (!title || !desc) {
    return res.status(400).json({ error: "타이틀이나 설명을 입력해 주세요." });
  }

  toDoData.push({ title, desc, isDone: false });

  console.log(toDoData);

  res.json(toDoData);
});

module.exports = router;
