import Image from "next/image";

const BookOfTheWeek = () => {
    return (
        <section className="mb-5">
            <h3 className="text-3xl font-bold mb-8 text-center md:text-left">Book of the Week</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-lg bg-base-200 dark:bg-base-300">
                <div className="h-full">
                    <Image
                        src="https://i.ibb.co.com/hxj98cx6/bookoftheweek.png"
                        alt="Book of the Week"
                        className="w-full h-full object-cover"
                        width={600}
                        height={800}
                    />
                </div>
                <div className="flex flex-col gap-5 p-8 justify-center">
                    <div>
                        <h4 className="text-2xl font-bold">Circe</h4>
                        <p className="opacity-70 font-medium text-lg">by Madeline Miller</p>
                    </div>
                    <p className="opacity-80 text-sm md:text-base leading-relaxed">
                        In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born.
                        Circe is a strange child—not powerful like her father, nor alluring like her mother. 
                        She discovers witchcraft, a power that can transform rivals into monsters and challenge gods themselves.
                    </p>
                    <div>
                        <button className="btn btn-primary rounded-full font-semibold">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookOfTheWeek;
