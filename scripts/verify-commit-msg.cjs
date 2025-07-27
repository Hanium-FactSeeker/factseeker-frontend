const fs = require("fs");

const msgPath = process.argv[2] || ".git/COMMIT_EDITMSG";
const msg = fs.readFileSync(msgPath, "utf-8").trim();

const commitRegex = /^(Feat|Fix|Docs|Style|Refactor|Test|Chore): .+/;

if (!commitRegex.test(msg)) {
  console.error(
    "\n 커밋 메시지 형식이 올바르지 않습니다.\n" +
      " 형식 예시: Feat: 로그인 기능 추가\n" +
      " 허용 타입: Feat, Fix, Docs, Style, Refactor, Test, Chore\n" +
      " 형식: 타입: 제목 ← `:` 뒤에 공백 포함\n"
  );
  process.exit(1);
}