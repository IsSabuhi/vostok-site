from django import forms
from .models import Participants, Coupon

class ParticipantsForm(forms.ModelForm):
    class Meta:
        model = Participants
        fields = ['participants_name', 'participants_surname', 'participants_middleName', 'phone']

class CouponForm(forms.ModelForm):
    class Meta:
        model = Coupon
        fields = ['coupon_number']