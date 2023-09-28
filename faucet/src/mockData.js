const greatMonkeysData = [...new Array(30)].fill({
    favoriteBanana: 'green',
    canSpeak: 'no',
    name: 'Charlie',
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBJPMsaD7uKYMEqUUCMIxi874fzG_az2vd-A&usqp=CAU',
});
harden(greatMonkeysData);

const awesomeCollectionData = [...new Array(30)].fill({
    artist: 'Leonardo da Vinci',
    createdAt: '16th Century',
    location: 'Milano',
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9i_SoCG02o1R0t1L8W6c6ONaL-PvhoxKVrA&usqp=CAU',
    name: 'Hello from faucet'
});
harden(awesomeCollectionData);

const chainboardTicketData = [...new Array(30)].fill({
    topic: 'Agoric',
    intakeClass: 'October 2024',
    instructor: 'Anıl Helvacı',
    duration: '15 weeks',
    imagePath: 'https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/1643/original/1661176654081.jpeg',
});
harden(chainboardTicketData);

export {
    greatMonkeysData,
    awesomeCollectionData,
    chainboardTicketData,
}