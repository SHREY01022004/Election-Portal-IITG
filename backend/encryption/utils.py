import os
import pickle
import base64
from pathlib import Path
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto.Signature import pss
from Crypto.Cipher import PKCS1_v1_5
import binascii


keys_dir = Path(__file__).resolve().parent/"keys"
passphrase = os.environ.get("PASSPHRASE",None)
public_key = keys_dir/"public_key.pem"
private_key = keys_dir/"private_key.pem"


def read_rsa_key():
    with open(private_key,"r") as key_file:
        key_pem = key_file.read()
    return key_pem

def get_ne_pair():
    key_pem = read_rsa_key()
    key = RSA.import_key(key_pem,passphrase)
    return {"N":str(key.n),"E":str(key.e)}


# return bytes string
def sign(data):
    key_pem = read_rsa_key()
    key = RSA.import_key(key_pem,passphrase)
    h = SHA256.new(pickle.dumps(data))
    signed = pss.new(key).sign(h)
    print(signed)
    return str(int(binascii.hexlify(signed),16))

#signature should be a bytes string -> return True/False 
def verify(data,signature):
    key_pem = read_rsa_key()
    key = RSA.import_key(key_pem,passphrase)
    h = SHA256.new(pickle.dumps(data))
    try:
        pss.new(key).verify(h, signature)
        return True
    except(ValueError, TypeError):
        return False

#data should be bytes string -> bytes string
def decrypt(encrypted_data):
    key_pem = read_rsa_key()
    key = RSA.import_key(key_pem,passphrase)
    stel = None
    decryptor = PKCS1_v1_5.new(key)
    decode_data = base64.b64decode(encrypted_data)
    if len(decode_data) == 127:
        hex_fixed = '00' + decode_data.hex()
        decode_data = base64.b16decode(hex_fixed.upper())
    decrypted_data_bs4 = decryptor.decrypt(decode_data,stel)
    if stel:
        raise Exception("Error decrypting data")
    
    return str(decrypted_data_bs4,encoding="utf-8")

#Helper function to test decrypt method,expects bytes string
def encrypt(data):
    key_pem = read_rsa_key()
    key = RSA.import_key(key_pem,passphrase)
    pubKey = key.publickey()
    encryptor = PKCS1_v1_5.new(pubKey)
    encrypted = encryptor.encrypt(data)
    return base64.b64encode(encrypted)


# Helper function required to generate admin keys,run once per election
def generate_keys():
    keypair = RSA.generate(2048)
    pub_key = keypair.publickey()

    with open(private_key,"wb") as file:
        file.write(keypair.export_key("PEM",passphrase))
        file.close()
    
    with open(public_key,"wb") as file:
        file.write(pub_key.export_key("PEM"))
        file.close()
    

    