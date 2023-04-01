import { execute } from "../services/process-executor";

export default function Home() {
  async function handler() {
    execute();
  }

  return (
    <>
      <button onClick={handler}>Execute</button>
    </>
  );
}
