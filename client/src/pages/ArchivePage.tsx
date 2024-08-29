const ArchivePage = () => {

    const countTotal = (num: number) => {
        console.log('...');
        return num + 10;
    }

    const total = countTotal(10);
    return (
        <div>
            archive page {total}
        </div>
    );
};

export default ArchivePage;