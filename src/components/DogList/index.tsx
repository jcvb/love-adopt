import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";
import { HeartIcon } from "../HeartIcon";

const DogList = () => {
  const dataDogs = useSelector((state: any) => state.dogs.dataDogs);
  const [liked, setLiked] = React.useState(false);
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {dataDogs.map((dog: any) => (
          <div key={dog.name}>
            <Card
              isFooterBlurred
              className="w-full h-[400px] col-span-6 sm:col-span-5"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start drop-shadow">
                <div className="flex justify-between w-full">
                  <span className="text-white uppercase font-bold drop-shadow-lg">
                  {dog.breed}
                  </span>
                  <Button
                  isIconOnly
                  className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                  radius="full"
                  variant="light"
                  onPress={() => setLiked((v) => !v)}
                >
                  <HeartIcon
                    className={liked ? "[&>path]:stroke-transparent" : ""}
                    fill={liked ? "#EA6A47" : "none"}
                  />
                </Button>
                </div>
                <h4 className=" text-white uppercase font-extrabold text-2xl drop-shadow-lg">
                  {dog.name}
                </h4>
                
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full  -translate-y-6 object-cover"
                src={dog.img}
              />
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div className="flex justify-center items-center">
                  <div className="text-black font-bold">Age {dog.age}</div>
                  <div className="text-black text-tiny ml-6 font-semibold">
                    Zip Code: {dog.zip_code}
                  </div>
                </div>
                <Button
                  className=" bg-la-secondary uppercase font-bold text-white"
                  radius="full"
                  size="sm"
                >
                  Adopt it
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default DogList;
