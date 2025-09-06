import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import "./App.css";

const query = gql`
  query GetTodosWithUser {
    todos {
      id
      title
      user {
        id
        name
        email
      }
    }
  }
`;
function App() {
  const { loading, data } = useQuery(query);
  console.log("🚀 ~ App ~ todos:", data?.todos);
  console.log("🚀 ~ App ~ data:", data);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {data?.todos.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>
            By: {item.user.name} ({item.user.email})
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
