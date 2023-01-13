import React from "react"
import style from "./MyProfileEditor.module.css"
import { useForm, SubmitHandler } from "react-hook-form"
import { UserDataEditorType } from "../../../../Types/Types"
import { InputAnimation } from "../../../Common/FormsControls/InputAnimation"

type PropsType = {
      userName : string
      profileImage: string
      changeUserData: (data: UserDataEditorType) => void
      onChangeProfilePhoto: (e: any) => void
}

export const MyProfileEditor: React.FC<PropsType> = React.memo(
  ({ changeUserData, onChangeProfilePhoto, profileImage,userName }) => {
    const {
      register,
      watch,
      formState: { errors, isValid },
      handleSubmit,
    } = useForm<UserDataEditorType>({ mode: "all",   defaultValues: { userName } })

    const onSubmit: SubmitHandler<UserDataEditorType> = (data) => {
      changeUserData(data)
    }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className={style.loginForm}>
          <div className = {style.editProfileContainer}>
              
              <div className = {style.editProfileImageBody}>
                  <div className={style.userProfileParagraphWrapper}>
                    <h4 className={style.paragraph}>{"Change your avatar"}</h4>
                  </div>
                  <div className={style.photoWrapper}>
                    <img src={profileImage} className={style.photo} alt="userPhoto" />
                  </div>
                  <div className={style.choseFile}>

                    <input
                      {...register('userPhoto') }
                      type="file"
                      onChange={onChangeProfilePhoto}
                      className={style.file}
                      name="userPhoto"
                      id="choseFile"
                      accept="image/*"
                    />

                    <label htmlFor="choseFile">
                      <span className={style.photoLabel}> {"Choose photo"}</span>
                    </label>
                  </div>
              </div>
              <div className = {style.editProfileNameBody}>
                  <div className={style.formParagraph}>
                    <h3 className={style.paragraph}>{"Change your name"}</h3>
                  </div>

                  <div className={style.editDataWrapper}>
                    <InputAnimation
                      register={register}
                      watch={watch}
                      type="text"
                      label="Your new name"
                      registerName="userName"
                      maxLengthValue={10}
                      maxLengthMessage="Max length 10 symbols"
                      minLengthValue={2}
                      minLengthMessage="Min length 2 symbols"
                      errors={errors.userName}
                      id="newUserName"
                      isRequired = {true}
                      requiredMessage = {'User Name is required'}
                    />
                  </div>
              </div>
          </div>
          <div className={style.formButtonWrapper}>
                <button className={style.btnSave}>
                      {isValid ?  "SAVE" : "Can't Save"} 
                </button>
          </div>
        </form>
      </>
    )
  }
)
