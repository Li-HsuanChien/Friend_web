from django.core.mail import send_mail
from django.template.loader import get_template

def send_confirmation_email(email, token_id, user_id):

	data ={
		'token_id': str(token_id),
	}
	message = get_template('friend_web/confirmation_email.txt').render(data)
	send_mail(subject='Please confirm your email for Friend-Web!',
			message=message,
			from_email='friend-web@no-reply.com',
			recipient_list=[email],
			fail_silently=True)

def send_password_email(email, token_id, user_id):

	data ={
		'token_id': str(token_id),
	}
	message = get_template('friend_web/reset_password.txt').render(data)
	send_mail(subject='Reset your password for Friend-Web!',
			message=message,
			from_email='friend-web@no-reply.com',
			recipient_list=[email],
			fail_silently=True)


