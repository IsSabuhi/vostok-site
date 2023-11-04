from django.shortcuts import render
from django.shortcuts import render, redirect
from .forms import ParticipantsForm, CouponForm
from django.http import JsonResponse
from .models import Participants, Coupon

def index(request):
    test = Participants.objects.all()
    return render(request, 'main/index.html', {'test': test})

def register_participant(request):
    if request.method == 'POST':
        participant_form = ParticipantsForm(request.POST)
        coupon_form = CouponForm(request.POST)
        
        if participant_form.is_valid() and coupon_form.is_valid():
            participant = participant_form.save()
            coupon = coupon_form.save(commit=False)
            coupon.participant_id = participant
            coupon.save()
            return JsonResponse({'message': 'Регистрация прошла успешно'})

    else:
        participant_form = ParticipantsForm()
        coupon_form = CouponForm()

    return render(request, 'registration_form.html', {'participant_form': participant_form, 'coupon_form': coupon_form})