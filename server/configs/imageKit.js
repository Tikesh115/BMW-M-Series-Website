import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
    publicKey : process.env['IMAGEKIT_PUBLIC_KEY'],
    privateKey : process.env['IMAGEKIT_PRIVATE_KEY'],
    urlEndPoint : process.env['IMAGEKIT_ENDPOINT_URL']
});

export default client;