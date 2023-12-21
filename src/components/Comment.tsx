import { Timeline } from "flowbite-react";
import { FaRegCommentAlt } from "react-icons/fa";
import Stars from "./Stars";
import { useGetCommentsBySlugQuery } from "../feature/api/apiCommentSlice";
import { FormatDate } from "../utils/FormatDate";

const Comment: React.FC<{ slug: string | undefined }> = ({ slug }) => {
  const { data: comments } = useGetCommentsBySlugQuery(slug!);
  return (
    <div className="mt-10 md:px-0 px-2">
      <h3 className="text-2xl my-3 font-bold border-b-[1px] mb-3 pb-3">
        Comments
      </h3>
      <div className="max-h-[300px] overflow-y-auto">
        <Timeline className="ml-3">
          {comments?.map((comment) => {
            return (
              <Timeline.Item key={comment._id}>
                <Timeline.Point icon={FaRegCommentAlt} />
                <Timeline.Content>
                  <Timeline.Time>{FormatDate(comment.createdAt)}</Timeline.Time>
                  <Timeline.Title className="flex items-center my-2">
                    {comment?.username}
                  </Timeline.Title>
                  <Timeline.Body className="text-gray-700">
                    <Stars starNum={comment.rating} />
                    {comment?.text}
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </div>
  );
};

export default Comment;
