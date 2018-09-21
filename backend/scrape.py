import urllib2
import re
import re
from bs4 import BeautifulSoup
import json

stackoverflow_url = 'https://stackoverflow.com/questions/tagged/java?page=%s&sort=newest&pagesize=50' 

def remove_spaces(text):
    return re.sub('\s+',' ',text)

question_list = []

for i in range(1,11):
    url = stackoverflow_url % i
    
    page = urllib2.urlopen(url)
    soup = BeautifulSoup(page)

    questions = soup.find_all('div', class_="question-summary")

    for question in questions:
        obj = {}
        vote_count = remove_spaces(question.find(class_='vote-count-post ').find('strong').text)
        views = remove_spaces(question.find(class_='views ').text)

        summary = question.find(class_='summary')
        ques_a_tag = summary.find('a', class_='question-hyperlink')

        ques, ques_url = ques_a_tag.text, ques_a_tag.get("href")

        ques_desc = remove_spaces(summary.find(class_='excerpt').text)

        user = question.find(class_='user-details').find('a')
        user_name = ""
        user_url = ""
        if user:
            user_name = user.text
            user_url = user.get('href')

        obj['vote_count'] = vote_count
        obj['views'] = views
        obj['ques'] = ques
        obj['ques_url'] = 'https://stackoverflow.com' + ques_url
        obj['ques_desc'] = ques_desc
        obj['user_name'] = user_name
        obj['user_url'] = 'https://stackoverflow.com' + user_url

        question_list.append(obj)
        
with open('user_data.json', 'wb') as outfile:
    json = json.dumps(question_list)
    outfile.write(json)
