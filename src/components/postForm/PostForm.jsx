import React , {useCallback , useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {Button , Input, Select, RTE} from '../index';
import appwriteService from "../../appwrite/config";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

 export default function postForm({post}) {
  // these props are from react hook form post me agr title ha toh wahi title wrna empty 
  const {register , handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",

    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    //this is scenario 1 where post is present and updating an exciting post 
    if (post) {  // agr post ha ur usme image ha toh appwrite me upload krdo
      const file = data.image[0]? await appwriteService.uploadFile(data.image[0]): null;
      if(file) { // agr file ha toh delete kar sakte ha 
        appwriteService.deleteFile(post.featuredImage);
      }

      //update post with slug and spreading the data 

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } 
  // this is scenario 2 creating a new post 
    else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if(file && userData) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
        
        if(dbPost){
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
       //slug transform agr value ha and uska type string toh value jo return hogi ase operation hone ke baad 
       // we used useCallback bcoz when the site refreshed it always recreted always check value and return value and re render 
         const slugTransform = useCallback((value) => {
          if(value && typeof value === "string")
             return value 
                   .trim()
                   .toLowerCase()
                   .replace(/[^a-zA-Z\d\s]+/g, "-")
                   .replace(/\s/g, "-");

            return "";
         },[]);

        // we used useEffect in this update the slug dynamically and sets up watch subscription
        useEffect(() => {
          const subscription = watch((value, {name}) => {
            if (name === "title") {
              setValue("slug", slugTransform(value.title), {shouldValidate: true});

            }
          });

          return () => subscription.unsubscribe();
        }, [watch, slugTransform, setValue]);


        return (
          <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
              <div className="w-2/3 px-2">
                  <Input
                      label="Title :"
                      placeholder="Title"
                      className="mb-4"
                      {...register("title", { required: true })}
                  />
                  <Input
                      label="Slug :"
                      placeholder="Slug"
                      className="mb-4"
                      {...register("slug", { required: true })}
                      onInput={(e) => {
                          setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                      }}
                  />
                  <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
              </div>
              <div className="w-1/3 px-2">
                  <Input
                      label="Featured Image :"
                      type="file"
                      className="mb-4"
                      accept="image/png, image/jpg, image/jpeg, image/gif"
                      {...register("image", { required: !post })}
                  />
                  {post && (
                      <div className="w-full mb-4">
                          <img
                              src={appwriteService.getFilePreview(post.featuredImage)}
                              alt={post.title}
                              className="rounded-lg"
                          />
                      </div>
                  )}
                  <Select
                      options={["active", "inactive"]}
                      label="Status"
                      className="mb-4"
                      {...register("status", { required: true })}
                  />
                  <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                      {post ? "Update" : "Submit"}
                  </Button>
              </div>
          </form>
      );

}

