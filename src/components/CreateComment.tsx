import { Button, Label, Select, Textarea } from "flowbite-react";
import { useCreateCommentMutation } from "../feature/api/apiCommentSlice";
import { useAppSelector } from "../feature/hook";
import { useUpdateFormHook } from "../utils/useUpdateFormHook";
import { useNavigate } from "react-router-dom";

const CreateComment: React.FC<{ slug: string | undefined }> = ({ slug }) => {
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const initialValue = {
    username: user?.name,
    text: "",
    rating: 1,
    slug: slug!,
    token: user?.token,
  };
  const { formValues, setFirstValue, onUpdate } =
    useUpdateFormHook(initialValue);

  const handleSubmitComment = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createComment(formValues)
      .unwrap()
      .then(() => {
        navigate("/product/" + slug);
      });
    setFirstValue();
  };

  if (!user) {
    return <span className="text-gray-600">Need login to comment</span>;
  }

  return (
    <form onSubmit={handleSubmitComment}>
      <div id="select">
        <div className="mb-2 block">
          <Label value="Rate product" />
        </div>
        <Select
          id="star"
          required={true}
          onChange={(e) => onUpdate("rating", e.target.value)}
          value={formValues.rating}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Select>
      </div>

      <div id="textarea">
        <div className="my-2 block">
          <Label value="Your message" />
        </div>
        <Textarea
          onChange={(e) => onUpdate("text", e.target.value)}
          placeholder="Leave a comment..."
          required={true}
          rows={4}
          value={formValues.text}
        />
      </div>
      <Button className="my-2 w-full" type="submit" disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
};

export default CreateComment;
