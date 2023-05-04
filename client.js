var net = require('net');
var client = new net.Socket({writeable: true});
var chilkat = require('@chilkat/ck-node18-win64'); 

client.on('close', function() {
    console.log('Connection closed');
});
client.on('error', function(err) {
    console.error('Connection error: ' + err);
    console.error(new Error().stack);
});

client.connect(52275, '127.0.0.1', function() {
    var count = 0;
    console.log('Connected');
    let data = "0708*DIP 172.25.21.89   00000000009575002130006780200*DSP          *DIP                              0000000000000                    SSSDIP01234567891778                                  000000000000                                                      PRDINT    00008230000*END00DIPMBSDSPO7002Q           44 006                              01778AR001NF                                                                                                                                                                                                                                                                                             202304250410420000000000000000000                  DP006DIPBPT    BPF823.TXT                    O120120";
    // let data = "0708*DIP 172.25.21.89";
    var charset = new chilkat.Charset();
    // charset.FromCharset = "utf-8";
    charset.ToCharset = "ibm037";
    var retBuf = charset.ConvertFromUnicode(data);
    console.log("Data is IBM037 charset?: " + charset.VerifyData("ibm037", retBuf));
    client.write(retBuf);
    //bufferSize does not seem to be an issue
    console.info(client.bufferSize);
});

client.on('data', function(data) {
	console.log('IBM037 Received: ' + data);
    var charset = new chilkat.Charset();
    charset.FromCharset = "ibm037";
    var retBuf = charset.ConvertToUnicode(data);
    let convString = Buffer.from(retBuf);
    console.log('ASCII Received: ' + convString.toString('utf8'));
	client.destroy(); // kill client after server's response
});