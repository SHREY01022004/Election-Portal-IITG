from main.models import VoterCard
from encryption.utils import decrypt
from .count_vote import count_votes as count_votes_block_list


positions=['Vice President, SGC', 'General Secretary HAB', 'General Secretary Welfare Board', 'General Secretary SWC', 'General Secretary Technical Board', 'General Secretary Sports Board', 'General Secretary SAIL', 'UG Senator', 'General Secretary Cultural Board', 'PG Senator', 'Girl Senator']

c_inv_map = {
    "0":"None",
    "-1":"Vice President, SGC,NOTA",
    "-2":"General Secretary HAB,NOTA",
    "-3":"General Secretary Welfare Board,NOTA",
    "-4":"General Secretary SWC,NOTA",
    "-5":"General Secretary Technical Board,NOTA",
    "-6":"General Secretary Sports Board,NOTA",
    "-7":"General Secretary SAIL,NOTA",
    "-8":"UG Senator,NOTA",
    "-9":"General Secretary Cultural Board,NOTA",
    "-10":"PG Senator,NOTA",
    "-12":"Girl Senator,NOTA",
"70":"Vice President, SGC,DANDA AKSHARA",
"19":"Vice President, SGC,CHITTI AVINASH REDDY",
"26":"General Secretary SWC,NANDIGRAMA NAGA VENKATA HAREESH",
"46":"Vice President, SGC,NEERAJ A R",
"41":"General Secretary Technical Board,P AASHRITH RAM",
"27":"Vice President, SGC,KANIKE UDAY",
"30":"Vice President, SGC,RACHIT AWASTHI",
"83":"General Secretary Welfare Board,AMIT KUMAR",
"91":"Vice President, SGC,RAVI RAJ",
"95":"General Secretary Cultural Board,PRERNA KUMARI",
"69":"Vice President, SGC,ANIRUDH GUPTA",
"40":"General Secretary Technical Board,KISHAN KUMAR",
"99":"General Secretary SWC,IPSITA JAIN",
"72":"General Secretary Sports Board,AYUSHMAN VERMA",
"88":"General Secretary HAB,YASHARTH SINGH",
"31":"Vice President, SGC,KULDEEP",
"63":"UG Senator,KUMAR SAARTHI",
"86":"UG Senator,MANGAL SINGH RATHORE",
"94":"UG Senator,AAYUSH AGARWAL",
"64":"UG Senator,AKSHAT TILAK",
"51":"UG Senator,DHIYANESH G",
"77":"UG Senator,RAKESH BHUTRA",
"55":"UG Senator,HIMANSHU RAJ",
"42":"General Secretary HAB,SANKET",
"50":"UG Senator,MALLA JASWANTH",
"54":"UG Senator,VAIBHAV JANGID",
"58":"UG Senator,GADDE SRI RAM RISHANDRA",
"53":"UG Senator,VARUN SINGH RATHORE",
"90":"UG Senator,YASH TIWARI",
"59":"Girl Senator,BACHINA KOMALI",
"80":"UG Senator,ANUSHKA CHOUDHARY",
"73":"PG Senator,MAHESHWAR DASS",
"45":"PG Senator,AKASH KUMAR",
"93":"PG Senator,JAGDISH KUMAR",
"52":"UG Senator,RAHUL GAUTAM",
"48":"General Secretary SWC,VIGHNESH DESHPANDE",
"20":"General Secretary SWC,KUNAL PAL",
"21":"General Secretary HAB,AMIT",
"44":"PG Senator,RUDRA BANERJEE",
"22":"PG Senator,MANISH RAY",
"23":"UG Senator,SARVESH MURKUTE",
"24":"Vice President, SGC,ABHISHEK RATHI",
"25":"General Secretary Cultural Board,AKHILESH GUPTA",
"28":"UG Senator,RITWIJ KUMAR",
"29":"General Secretary HAB,VIVEK DOND",
"32":"General Secretary SAIL,AMIT KUMAR SAH",
"33":"UG Senator,NISHCHAY SINGLA",
"34":"General Secretary SAIL,KANV CHAUDHARY",
"35":"PG Senator,PRAYAG RAJ BHUYAN",
"71":"UG Senator,AYUSH AWASTHI",
"37":"General Secretary Welfare Board,MANGAL",
"38":"General Secretary Sports Board,ANKIT KUMAR MAHATHA",
"39":"PG Senator,SAURABH PANTAWANE",
"43":"Vice President, SGC,UDAY PRATAP SINGH CHAUHAN",
"36":"PG Senator,OM HANDE",
"49":"UG Senator,PONAKALA HANUMA SAI KRISHNA",
"56":"General Secretary SAIL,URMI GOPALAKRISHNA",
"57":"General Secretary SWC,GEETANJAY MANIK",
"61":"Girl Senator,VEERANKI DEVI SAI SRI",
"60":"PG Senator,ABHIJEET",
"62":"UG Senator,ABHINAV",
"66":"PG Senator,AMLAN JYOTI GOGOI",
"65":"UG Senator,MAYANK AGRAWAL",
"67":"PG Senator,ARANYA BHUSHAN SHAH",
"68":"PG Senator,MS PRIYANKA TRIPATHI",
"75":"Girl Senator,MOUPARNA GUHA",
"76":"General Secretary HAB,ABHISHEK",
"78":"General Secretary Welfare Board,HIMANSHU SHARMA",
"79":"UG Senator,ANANY SIHARE",
"81":"General Secretary Welfare Board,GIRISH DHAKAR",
"84":"General Secretary HAB,GAURANG PARAG PATANKAR",
"85":"Girl Senator,CHANCHAL",
"87":"General Secretary Welfare Board,UJJAWAL CHHAJER",
"89":"General Secretary Sports Board,SHREYAS PIMPALKAR",
"92":"PG Senator,RASHMI GAHLOT",
"82":"UG Senator,SAURABH YADAV",
"74":"PG Senator,KHUSHI AGARWAL",
"97":"General Secretary SWC,DEEPSIKHA PANDEY",
"98":"General Secretary SAIL,AKSHAY KRUSHNA GHARDE"
}

def count_votes():
  votes = {}
  no_vote_voters = VoterCard.objects.filter(vote=None)
  failed=[]
  i=1

  for voter in VoterCard.objects.exclude(vote=None):
    try:
      vote = decrypt(voter.vote)
      elected_candidates = vote.split(",")
      for candidate_id in elected_candidates:
        if candidate_id not in votes:
          votes[candidate_id] = 0
        votes[candidate_id]+=1
      print("Count complete: ",i)
      i+=1
    except Exception as err:
      print("Failed Decryption")
      print(repr(err))
      failed+=[voter.uniqueid]
      
  print("Failed: ",len(failed))
  print(failed)
  print("No votes: ",no_vote_voters.count())
  print(no_vote_voters)
  print("Votes",votes)
  

  rv_map = {}
  for k in votes.keys():
      rv_map[c_inv_map[k]]=votes[k]
  group_map={}
  for p in positions:
      group_map[p]={}
      for k in rv_map:
          if k.startswith(p):
              group_map[p][k.split(",")[-1]]=rv_map[k]

  return votes,rv_map,group_map



def count_votes_block():
    voters = []
    for voter in VoterCard.objects.all():
        voters += [voter.uniqueid]
    return count_votes_block_list(voters)
    